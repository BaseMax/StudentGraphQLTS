import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginInput } from '../dto/login.input';
import { PrismaService } from '../../prisma/prisma.service';
import { OtpService } from './otp.service';
import { HashService } from './hash.service';
import { MailService } from '../../mail/mail.service';
import { JwtPayload } from '../types/jwt.payload';
import { JwtService } from '@nestjs/jwt';
import { RegisterInput } from '../dto/register.input';
import { VerificationInput } from '../dto/verification.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly otpService: OtpService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
    private readonly mailService: MailService,
  ) {}

  async signup(input: RegisterInput) {
    const emailExists = await this.checkStudentExists(input.email);
    if (emailExists) throw new BadRequestException('email already exists');

    const nationalCodeExits = await this.prisma.user.findFirst({
      where: { nationalCode: input.nationalCode },
    });
    if (nationalCodeExits)
      throw new BadRequestException('national Code already exists');

    const verification = await this.prisma.verification.findFirst({
      where: { email: input.email },
    });
    await this.otpService.validate(input.code, verification);

    const newStudent = await this.prisma.user.create({
      data: {
        email: input.email,
        nationalCode: input.nationalCode,
      },
    });

    const token = this.getTokens({
      id: newStudent.id,
      role: newStudent.role,
    });

    return { access_token: token };
  }

  async login(input: LoginInput) {
    const student = await this.prisma.user.findFirst({
      where: { nationalCode: input.nationalCode },
    });
    if (!student) throw new NotFoundException('student not found!');

    const validPassword = await this.hashService.compare(
      input.password,
      student.password,
    );

    if (!validPassword) throw new BadRequestException('credentials not valid!');

    const token = this.getTokens({
      id: student.id,
      role: student.role,
    });

    return { access_token: token };
  }

  getTokens(data: JwtPayload) {
    return this.jwtService.sign(data);
  }

  async sendCode(input: VerificationInput) {
    const emailExists = await this.checkStudentExists(input.email);
    if (emailExists) throw new BadRequestException('email already exists');

    const verification = await this.prisma.verification.findFirst({
      where: { email: input.email },
    });

    if (
      verification &&
      this.otpService.requestsALot(
        verification.try,
        verification.lastResendTime,
      )
    ) {
      throw new BadRequestException('Request too many verification codes');
    }

    const otp = this.otpService.generate();
    const hashedOtp = await this.hashService.hash(`${otp}`);

    await this.mailService.sendCode(otp, input.email);
    await this.prisma.verification.upsert({
      where: { email: input.email },
      create: {
        email: input.email,
        code: hashedOtp,
        lastResendTime: new Date().toString(),
      },
      update: {
        try: { increment: 1 },
        code: hashedOtp,
        lastResendTime: new Date().toISOString(),
      },
    });

    return { success: true };
  }

  private async checkStudentExists(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
  }
}

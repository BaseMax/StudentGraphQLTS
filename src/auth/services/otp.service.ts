import { BadRequestException, Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Verification } from '@prisma/client';
import { HashService } from './hash.service';

@Injectable()
export class OtpService {
  private readonly TWO_WEEKS_IN_MS = 2 * 7 * 24 * 60 * 60 * 1000;
  private readonly OTP_EXPIRATION_TIME_MS = 5 * 60 * 1000;
  private readonly MAX_OTP_REQUEST_ATTEMPTS = 10;

  constructor(private readonly hashService: HashService) {}

  generate(): number {
    return Math.floor(Math.random() * 9000 + 1000);
  }

  async isValid(otp: number, verification: Verification): Promise<boolean> {
    const timeNow = Date.now();
    const lastResendTime = new Date(verification.lastResendTime).getTime();
    const expirationTime = lastResendTime + this.OTP_EXPIRATION_TIME_MS;

    if (timeNow > expirationTime) {
      throw new NotAcceptableException('otp expired');
    }

    return await this.hashService.compare(`${otp}`, verification.code);
  }

  async validate(otp: number, verification: Verification) {
    const isValid = await this.isValid(otp, verification);

    if (!isValid) {
      throw new BadRequestException('otp not valid');
    }
  }

  requestsALot(numberOfAttempt: number, lastResendTime: Date) {
    const lastResendTimeMs = new Date(lastResendTime).getTime();
    const isPassedTwoWeeksFromLastResend =
      lastResendTimeMs + this.TWO_WEEKS_IN_MS < Date.now();

    return (
      numberOfAttempt > this.MAX_OTP_REQUEST_ATTEMPTS &&
      !isPassedTwoWeeksFromLastResend
    );
  }
}

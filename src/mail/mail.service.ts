import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendCode(code: number, email: string) {
    return this.mailerService.sendMail({
      to: email,
      subject: 'confirm email',
      text: `your otp code: ${code}`,
    });
  }
}

import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: +process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"Student" <info@mail.ir>',
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

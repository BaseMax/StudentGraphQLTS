import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthResolver } from './auth.resolver';
import { OtpService } from './services/otp.service';
import { HashService } from './services/hash.service';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
    MailModule,
  ],
  providers: [AuthResolver, AuthService, OtpService, HashService, JwtStrategy],
})
export class AuthModule {}

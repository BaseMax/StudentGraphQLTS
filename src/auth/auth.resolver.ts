import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './services/auth.service';
import { AuthPayload } from './types/auth.payload';
import { LoginInput } from './dto/login.input';
import { VerificationInput } from './dto/verification.input';
import { CodePayload } from './types/code.payload';
import { RegisterInput } from './dto/register.input';
import { Public } from '../common/decorators/public.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => AuthPayload)
  register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.signup(registerInput);
  }

  @Public()
  @Mutation(() => AuthPayload)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Public()
  @Mutation(() => CodePayload)
  sendCode(@Args('verificationInput') verificationInput: VerificationInput) {
    return this.authService.sendCode(verificationInput);
  }
}

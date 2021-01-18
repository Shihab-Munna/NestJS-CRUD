import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthCredentialDto } from './dto/authCredential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decoretors/getuser.decoretor';
import { User } from './user.entity';
@Controller('auth')
export class AuthController {
  constructor(private authSevice: AuthService) {}

  @Post('/signup')
  singUp(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<User> {
    return this.authSevice.signUp(authCredentialDto);
  }

  @Post('/sign-in')
  singIn(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<any> {
    return this.authSevice.signIn(authCredentialDto);
  }

  @Get('/all-user')
  async getall(): Promise<any> {
    return this.authSevice.getall();
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log(user);
  }
}

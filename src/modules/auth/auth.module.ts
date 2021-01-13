import { TasksModule } from './../tasks/tasks.module';
import { ENV } from '../../ENV';
import { UserRepository } from './user.repositiry';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

const SECRECT: string = ENV.JWT_SECRET;
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: SECRECT,
      signOptions: {
        expiresIn: '60m',
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
    forwardRef(() => TasksModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}

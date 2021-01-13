import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ENV } from 'src/ENV';
import { User } from './user.entity';
import { UserRepository } from './user.repositiry';
import { IjwtPayload } from './jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
const SECRET: string = ENV.JWT_SECRET;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: SECRET,
    });
  }

  async validate(payload: IjwtPayload): Promise<User> {
    const { username } = payload;
    const user = await this.userRepository.findOne({ username });

    if (!user) throw new UnauthorizedException();
    return user;
  }
}

// import { ENV } from 'src/ENV';
// import { User } from './user.entity';
// import { UserRepository } from './user.repositiry';
// import { IjwtPayload } from './jwt-payload.interface';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy, ExtractJwt } from 'passport-jwt';
// import { InjectRepository } from '@nestjs/typeorm';

// const SECRET: string = ENV.JWT_SECRET;
// // https://docs.nestjs.com/security/authentication#jwt-functionality

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     @InjectRepository(UserRepository)
//     private userRepository: UserRepository,
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrkey: 'smunna',
//     });
//     console.log(SECRET);
//   }

//   async validate(payload: IjwtPayload): Promise<User> {
//     const { username } = payload;
//     const user = await this.userRepository.findOne({ username });

//     if (!user) throw new UnauthorizedException();
//     return user;
//   }
// }

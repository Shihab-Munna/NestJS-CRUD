import { IjwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/authCredential.dto';
import { BcryptHelper } from '../../helper/bcrypt.helper';
import { UserRepository } from './user.repositiry';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  singInPlaceholder,
  successPlaceholder,
} from 'src/utils/responsePlaceholder.util';
import { JwtService } from '@nestjs/jwt';
import { json } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  bcryptHelper = new BcryptHelper();

  async signUp(authCredential: AuthCredentialDto): Promise<User> {
    const { username, password } = authCredential;
    const user = new User();
    user.username = username;
    user.password = await this.bcryptHelper.hashString(password);

    try {
      const userCreated = await this.userRepository.save(user);
      if (userCreated) delete userCreated.password;
      return userCreated;
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException('User Alredy exist');
      throw new InternalServerErrorException(error);
    }
  }

  async signIn(authCredential: AuthCredentialDto): Promise<any> {
    try {
      const { username, password } = authCredential;
      const findUser = await this.userRepository.findOne({ username });
      if (!findUser) throw new NotFoundException('User Not Found!');
      console.log(findUser);

      if (await !this.bcryptHelper.compareHash(password, findUser.password))
        throw new UnauthorizedException(
          'User Name or Password is not correct!',
        );
      const payload: IjwtPayload = { username };
      const token = await this.jwtService.sign(payload);
      return singInPlaceholder(token);
    } catch (error) {
      return error;
    }
  }

  async getall() {
    const options = {
      relations: ['tasks', 'tasks.subTasks'],
      order: {
        username: 'ASC',
      },
    };
    console.log(options);

    const findalluser = await this.userRepository.find({
      relations: ['tasks', 'tasks.subTasks'],
      order: {
        username: 'ASC',
      },
    });
    return successPlaceholder('Get All data Successfull', findalluser);
  }
}

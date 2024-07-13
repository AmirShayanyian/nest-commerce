import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SignUpto } from './dtos/sign-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { checkHashPassword, hashPassword } from 'src/common/utils/hash.util';
import { SignInDto } from './dtos/sign-in.dto';
import {
  BadRequestMessages,
  NotFoundMessages,
  ServerErrorMessages,
} from 'src/common/enums/messages.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ) {}

  async signUp(signUpDto: SignUpto) {
    let { username, first_name, last_name, password, email } = signUpDto;
    password = await hashPassword(password);
    const user = await this.userRepository.create({
      username,
      first_name,
      last_name,
      password,
      email,
    });
    await this.userRepository.save(user);
    return { message: 'Created' };
  }

  async signIn(signInDto: SignInDto) {
    const { username, password } = signInDto;
    const user = await this.checkExistByUsername(username);
    if (user && user?.password) {
      if (await checkHashPassword(password, user.password)) {
        return {
          message: 'Logged In successfully',
        };
      }
      throw new BadRequestException(BadRequestMessages.LoginFailed);
    }
    throw new InternalServerErrorException(
      ServerErrorMessages.SomethingWentWrong
    );
  }

  async checkExistByUsername(username: string) {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException(NotFoundMessages.UserNotFound);
    }
    return user;
  }
}

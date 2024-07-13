import { Injectable } from '@nestjs/common';
import { SignUpto } from './dtos/sign-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/common/utils/hash.util';

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
}

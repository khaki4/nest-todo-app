import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { isNil } from 'lodash';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpReturnValue } from './auth.model';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<SignUpReturnValue> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ username });

    if (isNil(user) || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('login fail');
    }

    const payload = { username };
    const accessToken = this.jwtService.sign(payload);

    return new SignUpReturnValue(accessToken);
  }
}

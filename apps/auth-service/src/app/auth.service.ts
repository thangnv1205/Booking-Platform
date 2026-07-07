import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
  ) {}

  // TODO: bcrypt hash password, enforce unique email (409 on conflict), return sanitized user
  async register(_dto: RegisterDto) {
    throw new Error('not implemented');
  }

  // TODO: Redis login-attempt lockout (N fails -> temp lockout), bcrypt compare, issue access+refresh
  async login(_dto: LoginDto) {
    throw new Error('not implemented');
  }

  // TODO: validate refresh token against Redis, rotate (delete old, issue new), reject if reused
  async refresh(_refreshToken: string) {
    throw new Error('not implemented');
  }

  // TODO: delete refresh token from Redis
  async logout(_refreshToken: string) {
    throw new Error('not implemented');
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createOne(createUser: Omit<User, 'id' | 'created_at'>) {
    const user = new User();
    user.username = createUser.username;
    user.created_at = new Date();
    return this.usersRepository.create(user);
  }
}

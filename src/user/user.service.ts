import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAll() {
    return this.usersRepository.find();
  }

  async getOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async createOne(createUser: UserDTO) {
    const user = this.usersRepository.create(UserDTO.toUser(createUser));
    return user.id;
  }

  async deleteOne(id: number) {
    await this.usersRepository.delete(id);
  }
}

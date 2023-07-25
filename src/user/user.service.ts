import { hashSync } from 'bcrypt';
import { validate } from 'class-validator';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDTO, UpdateUserDTO } from './dto';
import { User } from './entities';

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

  async getByUsername(username: string) {
    return this.usersRepository.findOneBy({ username });
  }

  async createOne(createUser: CreateUserDTO) {
    const errors = await validate(createUser);
    if (errors.length) {
      throw new BadRequestException({
        message: 'User input is invalid',
        errors,
      });
    }

    const { username } = createUser;
    const existing = await this.usersRepository.findOneBy({ username });
    if (existing !== null) {
      throw new UnprocessableEntityException({
        message: `User with username ${username} already exists`,
      });
    }

    const user = CreateUserDTO.toUser(createUser);

    const newUser = await this.usersRepository.save(user);
    return newUser;
  }

  async updateOne(updateUser: UpdateUserDTO) {
    const errors = await validate(updateUser);
    if (errors.length) {
      throw new BadRequestException({
        message: 'User input is invalid',
        errors,
      });
    }

    const { id, username: newUsername, password: newPasswordRaw } = updateUser;
    if (newUsername) {
      const existingUsername = await this.usersRepository.findOneBy({
        username: newUsername,
      });
      if (existingUsername !== null) {
        throw new UnprocessableEntityException({
          message: `User with username ${newUsername} already exists`,
        });
      }
    }

    const oldUser = await this.usersRepository.findOneBy({ id });
    if (!oldUser) {
      throw new NotFoundException({ message: 'User not found' });
    }
    let newPassword = oldUser.password;
    if (newPasswordRaw) {
      newPassword = hashSync(newPasswordRaw, 8);
    }

    await this.usersRepository.update(
      { id },
      { username: newUsername, password: newPassword },
    );
  }

  async deleteOne(id: number) {
    await this.usersRepository.delete(id);
  }

  async deleteByUsername(username: string) {
    await this.usersRepository.delete({ username });
  }
}

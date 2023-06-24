import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './dto';
import { validate } from 'class-validator';

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
    return this.usersRepository.find({ where: { username } });
  }

  async createOne(createUser: UserDTO) {
    const { username } = createUser;

    const errors = await validate(createUser);
    if (errors.length) {
      throw new HttpException(
        { message: 'User input is invalid', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const existing = await this.usersRepository.findOneBy({ username });
    if (existing !== null) {
      throw new HttpException(
        { message: 'User with such name already exists' },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const user = UserDTO.toUser(createUser);

    const newUser = await this.usersRepository.save(user);
    return newUser.id;
  }

  async deleteOne(id: number) {
    await this.usersRepository.delete(id);
  }
}

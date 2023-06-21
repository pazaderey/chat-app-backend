import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { Repository, In } from 'typeorm';
import { ChatDTO } from './dto';
import { User } from 'src/user/user.entity';
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAll() {
    return this.chatRepository.find();
  }

  async createOne(createChat: ChatDTO) {
    const errors = await validate(createChat);
    if (errors.length) {
      throw new HttpException(
        { message: 'Chat input is invalid', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const { name, users: userIds } = createChat;
    const existing = await this.chatRepository.findOneBy({ name });
    if (existing !== null) {
      throw new HttpException(
        { message: 'Chat with such name already exists' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const chat = ChatDTO.toChat(createChat);

    const users = await this.userRepository.find({
      where: { id: In(userIds) },
    });

    chat.users = users;
    const newChat = await this.chatRepository.save(chat);
    return newChat.id;
  }

  async getByUser(userId: number) {
    return this.chatRepository.find({
      relations: { users: true },
      where: { users: { id: userId } },
    });
  }
}

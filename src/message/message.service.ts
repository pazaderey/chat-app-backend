import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities';
import { Repository } from 'typeorm';
import { CreateMessageDTO } from './dto';
import { validate } from 'class-validator';
import { Chat } from 'src/chat/entities';
import { User } from 'src/user/entities';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getByChat(chatId: number) {
    return this.messageRepository.find({
      relations: { author: true },
      where: { chat: { id: chatId } },
      order: { created_at: 'ASC' },
    });
  }

  async createOne(createMessage: CreateMessageDTO) {
    const errors = await validate(createMessage);
    if (errors.length) {
      throw new HttpException(
        { message: 'Message input is invalid', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const message = CreateMessageDTO.toMessage(createMessage);
    const author = await this.userRepository.findOneBy({
      id: createMessage.author,
    });
    if (author === null) {
      throw new HttpException(
        { message: 'Author not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    message.author = author;

    const chat = await this.chatRepository.findOneBy({
      id: createMessage.chat,
    });
    if (chat === null) {
      throw new HttpException(
        { message: 'Chat not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    message.chat = chat;

    const newMessage = await this.messageRepository.save(message);

    return newMessage.id;
  }
}

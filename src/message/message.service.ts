import { validate } from 'class-validator';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Chat } from '../chat/entities';
import { User } from '../user/entities';

import { CreateMessageDTO, UpdateMessageDTO } from './dto';
import { Message } from './entities';

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

  async getAll() {
    return this.messageRepository.find();
  }

  async getOne(id: number) {
    return this.messageRepository.findOneBy({ id });
  }

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
      throw new BadRequestException({
        message: 'Message input is invalid',
        errors,
      });
    }

    const { author: authorId, chat: chatId } = createMessage;
    const message = CreateMessageDTO.toMessage(createMessage);
    const author = await this.userRepository.findOneBy({ id: authorId });
    if (author === null) {
      throw new NotFoundException({ message: 'Author not found' });
    }
    message.author = author;

    const chat = await this.chatRepository.findOne({
      relations: { users: true },
      where: { id: chatId },
    });
    if (chat === null) {
      throw new NotFoundException({ message: 'Chat not found' });
    }
    if (!chat.users.map((u) => u.id).includes(authorId)) {
      throw new UnprocessableEntityException({
        message: 'Author is not member of the chat',
      });
    }
    message.chat = chat;

    const newMessage = await this.messageRepository.save(message);

    return newMessage.id;
  }

  async updateOne(updateMessage: UpdateMessageDTO) {
    const errors = await validate(updateMessage);
    if (errors.length) {
      throw new BadRequestException({
        message: 'Message input is invalid',
        errors,
      });
    }

    const { id, text: newText } = updateMessage;
    const updated = await this.messageRepository.update(
      { id },
      { text: newText },
    );
    if (!updated.affected) {
      throw new NotFoundException({ message: 'Message not found' });
    }
  }

  async deleteOne(id: number) {
    await this.messageRepository.delete(id);
  }
}

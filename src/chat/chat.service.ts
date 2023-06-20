import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { Repository } from 'typeorm';
import { ChatDTO } from './chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  async createOne(createChat: ChatDTO) {
    const chat = this.chatRepository.create(ChatDTO.toChat(createChat));
    return chat.id;
  }

  async findByUser(userId: number) {
    return this.chatRepository.findBy({});
  }
}

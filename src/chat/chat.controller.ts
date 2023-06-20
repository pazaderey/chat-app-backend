import { Controller, Post, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDTO } from './chat.dto';

@Controller('chats')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('add')
  async createOne(creatChat: ChatDTO) {
    return this.chatService.createOne(creatChat);
  }

  @Get('get')
  async findByUser(userId: number) {
    return this.chatService.findByUser(userId);
  }
}

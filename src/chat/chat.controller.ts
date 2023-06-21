import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDTO, FindChatDTO } from './dto';

@Controller('chats')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('add')
  async createOne(@Body() createChat: ChatDTO) {
    return this.chatService.createOne(createChat);
  }

  @Post('get')
  @HttpCode(HttpStatus.OK)
  async getByUser(@Body() body: FindChatDTO) {
    return this.chatService.getByUser(body.user);
  }
}

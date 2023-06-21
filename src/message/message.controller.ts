import { Controller, Post, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { FindMessageDTO, MessageDTO } from './dto';

@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post('get')
  async getByChat(@Body() body: FindMessageDTO) {
    return this.messageService.getByChat(body.chat);
  }

  @Post('add')
  async createOne(@Body() body: MessageDTO) {
    return this.messageService.createOne(body);
  }
}

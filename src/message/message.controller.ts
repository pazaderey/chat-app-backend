import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { MessageService } from './message.service';
import { FindMessageDTO, MessageDTO } from './dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @ApiOperation({
    summary: 'Get all messages from the chat ordered by send time ASC',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @Post('get')
  @HttpCode(HttpStatus.OK)
  async getByChat(@Body() body: FindMessageDTO) {
    return this.messageService.getByChat(body.chat);
  }

  @ApiOperation({ summary: 'Create new message in the database' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Message input is invalid',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Chat or author ID not found in the database',
  })
  @Post('add')
  async createOne(@Body() body: MessageDTO) {
    return this.messageService.createOne(body);
  }
}

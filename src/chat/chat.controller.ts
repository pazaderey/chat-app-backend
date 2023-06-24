import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDTO, FindChatDTO } from './dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('chats')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @ApiOperation({ summary: 'Create new chat in the database' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Chat input is invalid',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Chat with such name already exists',
  })
  @Post('add')
  async createOne(@Body() createChat: ChatDTO) {
    return this.chatService.createOne(createChat);
  }

  @ApiOperation({
    summary: 'Get user chats ordered by last message sent time DESC',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @Post('get')
  @HttpCode(HttpStatus.OK)
  async getByUser(@Body() body: FindChatDTO) {
    return this.chatService.getByUser(body.user);
  }
}

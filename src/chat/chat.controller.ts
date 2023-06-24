import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { ChatService } from './chat.service';
import { CreateChatDTO, FindChatDTO } from './dto';

@Controller('chats')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @ApiOperation({
    summary: 'Get user chats ordered by last message sent time DESC',
  })
  @ApiOkResponse({ description: 'Success' })
  @Post('get')
  @HttpCode(HttpStatus.OK)
  async getByUser(@Body() body: FindChatDTO) {
    return this.chatService.getByUser(body.user);
  }

  @ApiOperation({ summary: 'Create new chat in the database' })
  @ApiCreatedResponse({ description: 'Created', type: Number })
  @ApiBadRequestResponse({ description: 'Chat input is invalid' })
  @ApiUnprocessableEntityResponse({
    description: 'Chat with such name already exists',
  })
  @Post('add')
  async createOne(@Body() createChat: CreateChatDTO) {
    return this.chatService.createOne(createChat);
  }
}

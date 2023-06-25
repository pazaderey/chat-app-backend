import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { ChatService } from './chat.service';
import { CreateChatDTO, FindChatDTO, UpdateChatDTO } from './dto';

@Controller('chats')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @ApiOperation({
    summary: 'Get user chats ordered by last message sent time DESC',
  })
  @ApiOkResponse({ description: 'Success' })
  @Get('get')
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

  @ApiOperation({ summary: 'Update chat by ID' })
  @ApiNoContentResponse({ description: 'Updated' })
  @ApiBadRequestResponse({ description: 'Chat input is invalid' })
  @ApiNotFoundResponse({ description: 'Chat not found' })
  @ApiUnprocessableEntityResponse({
    description: 'Chat with such name already exists',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('update')
  async updateOne(@Body() body: UpdateChatDTO) {
    await this.chatService.updateOne(body);
  }
}

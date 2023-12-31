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
} from '@nestjs/swagger';

import { CreateMessageDTO, FindMessageDTO, UpdateMessageDTO } from './dto';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @ApiOperation({
    summary: 'Get all messages from the chat ordered by send time ASC',
  })
  @ApiOkResponse({ description: 'Success' })
  @Get('get')
  async getByChat(@Body() body: FindMessageDTO) {
    return this.messageService.getByChat(body.chat);
  }

  @ApiOperation({ summary: 'Create new message in the database' })
  @ApiCreatedResponse({ description: 'Created', type: Number })
  @ApiBadRequestResponse({ description: 'Message input is invalid' })
  @ApiNotFoundResponse({
    description: 'Chat or author ID not found in the database',
  })
  @Post('add')
  async createOne(@Body() body: CreateMessageDTO) {
    return this.messageService.createOne(body);
  }

  @ApiOperation({ summary: 'Updates message text by ID' })
  @ApiNoContentResponse({ description: 'Updated' })
  @ApiBadRequestResponse({ description: 'Message input is invalid' })
  @ApiNotFoundResponse({ description: 'Message not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('update')
  async updateOne(@Body() body: UpdateMessageDTO) {
    await this.messageService.updateOne(body);
  }
}

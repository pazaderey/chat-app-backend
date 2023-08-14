import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';

@Controller('chats')
export class ChatController {
  constructor(
    private chatService: ChatService,
    private jwtService: JwtService,
  ) {}

  @ApiOperation({
    summary: 'Get user chats ordered by last message sent time DESC',
  })
  @ApiOkResponse({ description: 'Success' })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('get')
  async getByUser(
    @Headers('authorization') auth: string,
    @Body() body: FindChatDTO,
  ) {
    const token = auth.split(' ')[1];
    const searcher = this.jwtService.decode(token);
    if ((searcher as { [key: string]: any }).id !== body.user) {
      throw new UnauthorizedException('Cannot get chats of other users');
    }
    return this.chatService.getByUser(body.user);
  }

  @ApiOperation({ summary: 'Create new chat in the database' })
  @ApiCreatedResponse({ description: 'Created', type: Number })
  @ApiBadRequestResponse({ description: 'Chat input is invalid' })
  @ApiUnprocessableEntityResponse({
    description: 'Chat with such name already exists',
  })
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('update')
  async updateOne(@Body() body: UpdateChatDTO) {
    await this.chatService.updateOne(body);
  }
}

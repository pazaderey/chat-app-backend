import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Message } from '../message/entities/message.entity';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';

import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { Chat } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, User, Message]), UserModule],
  providers: [ChatService],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { UserModule } from 'src/user/user.module';
import { ChatModule } from 'src/chat/chat.module';
import { User } from 'src/user/user.entity';
import { Chat } from 'src/chat/chat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, User, Chat]),
    UserModule,
    ChatModule,
  ],
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}

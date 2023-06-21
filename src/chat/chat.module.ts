import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, User]), UserModule],
  providers: [ChatService],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}

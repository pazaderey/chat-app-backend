import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { ChatController } from './chat/chat.controller';
import { ChatService } from './chat/chat.service';
import { Chat } from './chat/chat.entity';
import { MessageController } from './message/message.controller';
import { MessageService } from './message/message.service';
import { Message } from './message/message.entity';
import { join } from 'path';
import { UserModule } from './user/user.module';

require('dotenv').config({ path: join(__dirname, '../.env') });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Chat, Message],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
  ],
  controllers: [
    AppController,
    UserController,
    ChatController,
    MessageController,
  ],
  providers: [AppService, UserService, ChatService, MessageService],
})
export class AppModule {}

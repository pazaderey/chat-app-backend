import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ChatModule } from './chat/chat.module';
import { configService } from './config/config.service';
import { MessageModule } from './message/message.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
    ChatModule,
    MessageModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

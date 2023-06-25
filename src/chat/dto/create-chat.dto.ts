import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

import { Chat } from '../entities/chat.entity';

import { nameProps, usersProps } from './api.properties';

export class CreateChatDTO implements Readonly<CreateChatDTO> {
  @ApiProperty(nameProps)
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty(usersProps)
  @IsNotEmpty()
  @IsArray()
  users!: number[];

  static toChat(dto: CreateChatDTO) {
    const it = new Chat();
    it.name = dto.name;
    return it;
  }
}

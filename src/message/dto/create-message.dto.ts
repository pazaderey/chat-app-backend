import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

import { Message } from '../entities/message.entity';

import { authorProps, chatProps, textProps } from './api.properties';

export class CreateMessageDTO implements Readonly<CreateMessageDTO> {
  @ApiProperty(chatProps)
  @IsNotEmpty()
  @IsInt()
  chat!: number;

  @ApiProperty(authorProps)
  @IsNotEmpty()
  @IsInt()
  author!: number;

  @ApiProperty(textProps)
  @IsNotEmpty()
  @IsString()
  text!: string;

  static toMessage(dto: CreateMessageDTO) {
    const it = new Message();
    it.text = dto.text;
    return it;
  }
}

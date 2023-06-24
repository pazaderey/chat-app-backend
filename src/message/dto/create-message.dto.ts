import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

import { Message } from '../entities/message.entity';

export class CreateMessageDTO implements Readonly<CreateMessageDTO> {
  @ApiProperty({
    example: 1,
    description: 'Chat ID to send message',
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  chat!: number;

  @ApiProperty({
    example: 1,
    description: "User ID of the message's author",
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  author!: number;

  @ApiProperty({
    example: 'Hello',
    description: 'Message text',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  text!: string;

  static toMessage(dto: CreateMessageDTO) {
    const it = new Message();
    it.text = dto.text;
    return it;
  }
}

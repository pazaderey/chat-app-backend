import { Message } from '../entities/message.entity';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class CreateMessageDTO implements Readonly<CreateMessageDTO> {
  @ApiProperty({
    example: 1,
    description: 'Chat ID to send message',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  chat!: number;

  @ApiProperty({
    example: 1,
    description: "User ID of the message's author",
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
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

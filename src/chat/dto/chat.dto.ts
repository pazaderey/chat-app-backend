import { Chat } from '../chat.entity';
import { IsString, IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class ChatDTO implements Readonly<ChatDTO> {
  @ApiProperty({
    example: 'Secret chat',
    maxLength: 30,
    required: true,
    uniqueItems: true,
    description: 'Name of the chat',
  })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    example: [1, 2, 3],
    required: true,
    description: 'Chat members',
    type: 'number[]',
  })
  @IsNotEmpty()
  @IsArray()
  users!: number[];

  static toChat(dto: ChatDTO) {
    const it = new Chat();
    it.name = dto.name;
    return it;
  }
}

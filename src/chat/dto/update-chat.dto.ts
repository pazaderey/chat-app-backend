import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Chat } from '../entities';
import { CreateChatDTO } from './create-chat.dto';

export class UpdateChatDTO implements Partial<CreateChatDTO> {
  @ApiProperty({
    example: 1,
    description: 'Chat ID',
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  readonly id!: number;

  @ApiProperty({
    example: 'New name',
    description: 'New chat name',
    type: String,
    required: false,
  })
  @IsString()
  name: string | undefined;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'Complete array of chat members',
    type: 'number[]',
    required: false,
  })
  @IsArray()
  users: number[] | undefined;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'Users to add in chat',
    type: 'number[]',
    required: false,
  })
  @IsArray()
  newUsers: number[] | undefined;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'Users to delete from chat',
    type: 'number[]',
    required: false,
  })
  @IsArray()
  deleteUsers: number[] | undefined;

  static toChat(dto: UpdateChatDTO, source: Chat) {
    const it = new Chat();
    it.id = source.id;
    it.name = dto.name ?? source.name;
    it.created_at = source.created_at;
    return it;
  }
}

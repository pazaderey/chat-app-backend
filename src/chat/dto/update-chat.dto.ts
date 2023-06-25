import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Chat } from '../entities';
import { CreateChatDTO } from './create-chat.dto';

import { idProps, nameProps, usersProps } from './api.properties';

export class UpdateChatDTO implements Partial<CreateChatDTO> {
  @ApiProperty(idProps)
  @IsNotEmpty()
  @IsInt()
  readonly id!: number;

  @ApiProperty(nameProps)
  @IsString()
  name: string | undefined;

  @ApiProperty({
    ...usersProps,
    description: 'Complete array of chat members',
    required: false,
  })
  @IsArray()
  users: number[] | undefined;

  @ApiProperty({
    ...usersProps,
    description: 'Users to add in chat',
    required: false,
  })
  @IsArray()
  newUsers: number[] | undefined;

  @ApiProperty({
    ...usersProps,
    description: 'Users to delete from chat',
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

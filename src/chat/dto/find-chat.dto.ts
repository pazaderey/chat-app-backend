import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

import { usersProps } from './api.properties';

export class FindChatDTO implements Readonly<FindChatDTO> {
  @ApiProperty({ ...usersProps, description: "User ID, who's chats to find" })
  @IsNotEmpty()
  @IsInt()
  user!: number;
}

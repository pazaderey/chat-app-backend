import { IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class FindChatDTO implements Readonly<FindChatDTO> {
  @ApiProperty({
    example: 1,
    description: "User ID, who's chats to find",
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  user!: number;
}

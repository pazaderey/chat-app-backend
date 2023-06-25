import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class FindChatDTO implements Readonly<FindChatDTO> {
  @ApiProperty({
    description: "User ID, who's chats to find",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  user!: number;
}

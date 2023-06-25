import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateChatDTO implements Readonly<UpdateChatDTO> {
  @ApiProperty({
    example: 1,
    description: 'Chat ID',
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @ApiProperty({
    example: 'New name',
    description: 'New chat name',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name!: string;

  // TODO: Users update
}

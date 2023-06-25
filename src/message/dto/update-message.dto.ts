import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDTO implements Readonly<UpdateMessageDTO> {
  @ApiProperty({
    example: 1,
    description: 'Message ID',
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @ApiProperty({
    example: 'Hi',
    description: 'Edited message text',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  text!: string;
}

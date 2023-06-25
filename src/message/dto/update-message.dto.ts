import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateMessageDTO } from './create-message.dto';

export class UpdateMessageDTO implements Partial<CreateMessageDTO> {
  @ApiProperty({
    example: 1,
    description: 'Message ID',
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  readonly id!: number;

  @ApiProperty({
    example: 'Hi',
    description: 'Edited message text',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  text!: string;
}

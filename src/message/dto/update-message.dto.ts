import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateMessageDTO } from './create-message.dto';

import { idProps, textProps } from './api.properties';

export class UpdateMessageDTO implements Partial<CreateMessageDTO> {
  @ApiProperty(idProps)
  @IsNotEmpty()
  @IsInt()
  readonly id!: number;

  @ApiProperty({ ...textProps, description: 'Edited message text' })
  @IsNotEmpty()
  @IsString()
  text!: string;
}

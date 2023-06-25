import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

import { chatProps } from './api.properties';

export class FindMessageDTO implements Readonly<FindMessageDTO> {
  @ApiProperty({ ...chatProps, description: 'Chat ID to find messages' })
  @IsNotEmpty()
  @IsInt()
  chat!: number;
}

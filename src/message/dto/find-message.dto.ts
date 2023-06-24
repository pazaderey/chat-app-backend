import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class FindMessageDTO implements Readonly<FindMessageDTO> {
  @ApiProperty({
    example: 1,
    description: 'Chat ID to find messages',
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  chat!: number;
}

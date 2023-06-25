import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDTO implements Readonly<UpdateUserDTO> {
  @ApiProperty({
    example: 1,
    description: 'Message ID',
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @ApiProperty({
    example: 'Carl_1',
    description: 'New username',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  username!: string;
}

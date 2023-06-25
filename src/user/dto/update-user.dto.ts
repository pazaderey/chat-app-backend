import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDTO } from './create-user.dto';

export class UpdateUserDTO implements Partial<CreateUserDTO> {
  @ApiProperty({
    example: 1,
    description: 'Message ID',
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  readonly id!: number;

  @ApiProperty({
    example: 'Carl_1',
    description: 'New username',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  username!: string;
}

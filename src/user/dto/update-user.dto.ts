import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDTO } from './create-user.dto';

import { idProps, usernameProps } from './api.properties';

export class UpdateUserDTO implements Partial<CreateUserDTO> {
  @ApiProperty(idProps)
  @IsNotEmpty()
  @IsInt()
  readonly id!: number;

  @ApiProperty({ ...usernameProps, description: 'New username' })
  @IsNotEmpty()
  @IsString()
  username!: string;
}

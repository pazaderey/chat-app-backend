import { hashSync } from 'bcrypt';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../entities/user.entity';

import { usernameProps, passwordProps } from './api.properties';

export class CreateUserDTO implements Readonly<CreateUserDTO> {
  @ApiProperty(usernameProps)
  @IsNotEmpty()
  @IsString()
  username!: string;

  @ApiProperty(passwordProps)
  @IsNotEmpty()
  @IsString()
  password!: string;

  static toUser(dto: CreateUserDTO) {
    const it = new User();
    it.username = dto.username;
    it.password = hashSync(dto.password, 8);
    return it;
  }
}

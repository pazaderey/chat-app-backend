import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../entities/user.entity';

import { usernameProps } from './api.properties';

export class CreateUserDTO implements Readonly<CreateUserDTO> {
  @ApiProperty(usernameProps)
  @IsNotEmpty()
  @IsString()
  username!: string;

  static toUser(dto: CreateUserDTO) {
    const it = new User();
    it.username = dto.username;
    return it;
  }
}

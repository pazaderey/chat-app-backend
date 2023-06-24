import { User } from '../entities/user.entity';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO implements Readonly<CreateUserDTO> {
  @ApiProperty({
    example: 'Carl',
    description: 'Username used in the chat',
    maxLength: 30,
    required: true,
    uniqueItems: true,
  })
  @IsNotEmpty()
  @IsString()
  username!: string;

  static toUser(dto: CreateUserDTO) {
    const it = new User();
    it.username = dto.username;
    return it;
  }
}

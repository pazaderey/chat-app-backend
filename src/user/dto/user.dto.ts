import { User } from '../user.entity';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO implements Readonly<UserDTO> {
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

  static toUser(dto: UserDTO) {
    const it = new User();
    it.username = dto.username;
    return it;
  }
}

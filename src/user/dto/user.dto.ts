import { User } from '../user.entity';
import { IsString, IsNotEmpty } from 'class-validator';

export class UserDTO implements Readonly<UserDTO> {
  @IsNotEmpty()
  @IsString()
  username: string;

  static toUser(dto: Partial<UserDTO>) {
    const it = new User();
    it.username = dto.username;
    return it;
  }
}

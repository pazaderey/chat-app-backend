import { User } from './user.entity';

export class UserDTO implements Readonly<UserDTO> {
  username: string;

  static toUser(dto: Partial<UserDTO>) {
    const it = new User();
    it.username = dto.username;
    it.created_at = new Date();
    return it;
  }
}

import { User } from 'src/user/user.entity';
import { Chat } from './chat.entity';

export class ChatDTO implements Readonly<ChatDTO> {
  name: string;
  users: number[];

  static toChat(dto: Partial<ChatDTO>) {
    const it = new Chat();
    it.name = dto.name;
    //it.users = dto.users;
    it.created_at = new Date();
    return it;
  }
}

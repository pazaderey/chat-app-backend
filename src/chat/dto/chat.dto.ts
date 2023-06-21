import { Chat } from '../chat.entity';
import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class ChatDTO implements Readonly<ChatDTO> {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsArray()
  users!: number[];

  static toChat(dto: ChatDTO) {
    const it = new Chat();
    it.name = dto.name;
    return it;
  }
}

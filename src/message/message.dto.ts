import { Message } from './message.entity';

export class MessageDTO implements Readonly<MessageDTO> {
  chat: number;
  author: number;
  text: string;

  static toMessage(dto: MessageDTO) {
    const it = new Message();
    it.created_at = new Date();
    it.text = dto.text;
    return it;
  }
}

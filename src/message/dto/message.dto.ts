import { Message } from '../message.entity';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class MessageDTO implements Readonly<MessageDTO> {
  @IsNotEmpty()
  @IsNumber()
  chat: number;

  @IsNotEmpty()
  @IsNumber()
  author: number;

  @IsNotEmpty()
  @IsString()
  text: string;

  static toMessage(dto: MessageDTO) {
    const it = new Message();
    it.text = dto.text;
    return it;
  }
}

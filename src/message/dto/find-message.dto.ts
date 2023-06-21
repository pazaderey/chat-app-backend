import { IsNotEmpty, IsInt } from 'class-validator';

export class FindMessageDTO implements Readonly<FindMessageDTO> {
  @IsNotEmpty()
  @IsInt()
  chat: number;
}

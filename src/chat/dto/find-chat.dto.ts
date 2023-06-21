import { IsNotEmpty, IsInt } from 'class-validator';

export class FindChatDTO implements Readonly<FindChatDTO> {
  @IsNotEmpty()
  @IsInt()
  user: number;
}

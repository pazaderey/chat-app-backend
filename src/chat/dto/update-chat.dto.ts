import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateChatDTO implements Readonly<UpdateChatDTO> {
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @IsNotEmpty()
  @IsString()
  name!: string;
}

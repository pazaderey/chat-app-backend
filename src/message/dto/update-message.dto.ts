import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateMessageDTO implements Readonly<UpdateMessageDTO> {
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @IsNotEmpty()
  @IsString()
  text!: string;
}

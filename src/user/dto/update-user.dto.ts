import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDTO implements Readonly<UpdateUserDTO> {
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @IsNotEmpty()
  @IsString()
  username!: string;
}

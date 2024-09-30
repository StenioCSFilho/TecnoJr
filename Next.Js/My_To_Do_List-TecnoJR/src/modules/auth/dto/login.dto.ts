/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Email é obrigatorio.' })
  email: string;

  @IsNotEmpty({ message: 'senha é obrigatorio.' })
  password: string;
}
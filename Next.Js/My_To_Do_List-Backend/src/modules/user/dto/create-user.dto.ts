import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Nome deve ser uma string.' })
  @IsNotEmpty({ message: 'Nome é obrigatorio' })
  name: string;

  @IsString({ message: 'Email deve ser uma string.' })
  @IsEmail({}, { message: 'Email deve ser um email.' })
  @IsNotEmpty({ message: 'Email é obrigatorio' })
  email: string;

  @IsString({ message: 'senha deve ser uma string.' })
  @IsNotEmpty({ message: 'senha é obrigatorio' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    { message: 'Senha deve ser forte.' },
  )
  password: string;
}

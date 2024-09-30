/* eslint-disable prettier/prettier */
import { Transform } from 'class-transformer';
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Priority } from 'src/common/enum/Priority.enum';
import { Status } from 'src/common/enum/Status.enum';

/* eslint-disable prettier/prettier */
export class CreateTaskDto {
    @IsString({ message: 'Titulo deve ser uma string.' })
    @IsNotEmpty({ message: 'Titulo é obrigatorio.' })
    title: string;

    @IsString({ message: 'Descrição deve ser uma string.' })
    @IsNotEmpty({ message: 'Descrição é obrigatorio' })
    description: string;

    @IsString({ message: 'Status deve ser uma string.' })
    @IsOptional({ message: 'Status é opcional.' })
    @IsEnum(Status)
    status: Status;
    
    @IsDateString({}, { message: 'Data limite deve ser uma data valida.' })
    @IsNotEmpty({ message: 'Data limite é obrigatorio.' })
    deadline: Date;

    @IsString({ message: 'Prioridade deve ser uma string.' })
    @IsNotEmpty({ message: 'Prioridade é obrigatorio.' })
    @IsEnum(Priority)
    priority: Priority;

    @IsInt({ message: 'Usuário deve ser um numero inteiro.' })
    @IsNotEmpty({ message: 'Usuário é obrigatorio.' })
    @Transform(({ value }) => parseInt(value,10))
    userId: number;
}

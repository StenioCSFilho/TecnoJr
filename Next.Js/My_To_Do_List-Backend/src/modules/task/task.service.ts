/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserService } from './../user/user.service';


@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private readonly UserService: UserService,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
     await this.UserService.findOne(createTaskDto.userId);
    
    return await this.taskRepository.save(createTaskDto);
  }

  async findAll() {
    return await this.taskRepository.find();
  }

  async findOne(id: number) {
    try{
      return await this.taskRepository.findOneByOrFail({ id });
    } catch (error){
       throw new NotFoundException('Tarefa não encontrada.');
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.findOne(id);
    if(updateTaskDto.userId) {
      await this.UserService.findOne(updateTaskDto.userId);
    }
    return await this.taskRepository.update(id,updateTaskDto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.taskRepository.delete(id);
  }
}

/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';

@Controller('api')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('task')
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.create(createTaskDto);
  }

  @Get('tasks')
  async findAll() {
    return await this.taskService.findAll();
  }

  @Get('task/:id')
  async findOne(@Param('id') id: string) {
    return await this.taskService.findOne(+id);
  }

  @Patch('task/:id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return await this.taskService.update(+id, updateTaskDto);
  }

  @Delete('task/:id')
  async remove(@Param('id') id: string) {
    return await this.taskService.remove(+id);
  }
}

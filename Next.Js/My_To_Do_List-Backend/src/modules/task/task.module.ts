/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { Task } from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), forwardRef(() => UserModule)],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}

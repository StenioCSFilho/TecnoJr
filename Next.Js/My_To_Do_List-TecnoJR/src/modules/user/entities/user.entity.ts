import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './../../task/entities/task.entity';

@Entity({ name: 'user', orderBy: { id: 'ASC' } })
export class User {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 255,
    nullable: false,
    select: false,
  })
  password: string;

  @OneToMany(() => Task, (task) => task.user, { onDelete: 'CASCADE' })
  tasks: Task[];
}

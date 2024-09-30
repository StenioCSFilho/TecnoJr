/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './../../user/entities/user.entity';

// eslint-disable-next-line prettier/prettier
@Entity({ name: 'task', orderBy: { id: 'ASC' } })
export class Task {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column({ type: 'varchar', length: 255, name:  'title', nullable: false })
    title: string;

    @Column({ type: 'text', name:  'description', nullable: false })
    description: string;

    @Column({ type: 'varchar', length: 50, name:  'status', nullable: false, default: 'Em andamento', })
    status: string;

    @Column({ type: 'datetime', name:  'deadline', nullable: false })
    deadline: Date;
    
    @Column({ type: 'varchar',length: 50, name:  'priority', nullable: false })
    priority: string;

    @Column({ type: 'int', name:  'user_id', nullable: false })
    userId: number;

    @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id'})
    user: User;
}

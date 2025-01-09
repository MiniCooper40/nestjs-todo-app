import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  todoId: number;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  priority: number;

  @CreateDateColumn()
  createdTime: Date;

  @Column({ type: 'timestamptz', nullable: true })
  completionTime: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  dueTime: Date | null;
}

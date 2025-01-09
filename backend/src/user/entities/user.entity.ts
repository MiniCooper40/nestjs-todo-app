import { Todo } from 'src/todo/entities/todo.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @CreateDateColumn()
  creationTime: Date;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}

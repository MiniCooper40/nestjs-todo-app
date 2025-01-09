import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private readonly userService: UserService,
  ) {}

  async create(username: string, createTodoDto: CreateTodoDto) {
    if (username !== createTodoDto.username) return null;
    const user = await this.userService.findByUsername(username);
    if (!user) return null;
    const todo = await this.todoRepository.save(createTodoDto);
    if (!todo) return null;
    if (!user.todos) user.todos = [];
    user.todos.push(todo);
    this.userService.save(user);

    return todo;
  }

  findAll() {
    return this.todoRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  findByUserId(userId: number) {
    return this.todoRepository.find({
      where: {
        user: {
          userId,
        },
      },
    });
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.todoRepository.update(id, updateTodoDto);
  }

  remove(id: number) {
    return this.todoRepository.delete(id);
  }
}

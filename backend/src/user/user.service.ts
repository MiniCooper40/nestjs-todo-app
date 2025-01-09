import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SaveOptions } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(this.userRepository.create(createUserDto));
  }

  findAll() {
    return this.userRepository.find();
  }

  findById(userId: number) {
    return this.userRepository.findOne({
      where: {
        userId,
      },
    });
  }

  findByUsername(username: string) {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  async findTodosByUserId(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        userId,
      },
      relations: {
        todos: true,
      },
    });

    if (!user) return null;

    return user.todos;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  save(user: User, options?: SaveOptions) {
    return this.userRepository.save(user, options);
  }
}

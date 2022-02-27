import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoStatus } from './todo-status.enum';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoRepository } from './todo.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { isUndefined } from 'lodash';
import { User } from '../auth/user.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoRepository)
    private todoRepository: TodoRepository,
  ) {}

  createTodo(createBoardDto: CreateTodoDto, user: User): Promise<Todo> {
    return this.todoRepository.createTodo(createBoardDto, user);
  }

  async updateTodoStatus(id: number, status: TodoStatus): Promise<Todo> {
    const todo = await this.getTodoById(id);
    await this.todoRepository.updateTodo(todo, status);

    return todo;
  }

  async getAllTodos(user: User): Promise<Todo[]> {
    return await this.todoRepository.getAllTodos(user);
  }

  async getTodoById(id: number): Promise<Todo> {
    const found = await this.todoRepository.findOne(id);
    if (isUndefined(found)) {
      throw new NotFoundException(`Can't find Todo with id ${id}`);
    }

    return found;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.todoRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find todo with id ${id}`);
    }
  }
}

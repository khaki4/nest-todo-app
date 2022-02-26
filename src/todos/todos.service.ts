import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoStatus } from './todo-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoRepository } from './todo.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { isUndefined } from 'lodash';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoRepository)
    private todoRepository: TodoRepository,
  ) {}

  createTodo(createBoardDto: CreateTodoDto): Promise<Todo> {
    return this.todoRepository.createTodo(createBoardDto);
  }

  async updateTodoStatus(id: number, status: TodoStatus): Promise<Todo> {
    const todo = await this.getTodoById(id);

    todo.status = status;
    await this.todoRepository.save(todo);

    return todo;
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

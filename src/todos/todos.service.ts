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

  async createTodo(createBoardDto: CreateTodoDto): Promise<Todo> {
    const { title, description } = createBoardDto;
    const todo = this.todoRepository.create({
      title,
      description,
      status: TodoStatus.OPEN,
    });

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
}

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
  // getAllBoards(): Todo[] {
  //   return this.todos;
  // }
  //
  // createTodo(createTodoDto: CreateTodoDto): Todo {
  //   const { title, description } = createTodoDto;
  //   const todo: Todo = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TodoStatus.OPEN,
  //   };
  //
  //   this.todos.push(todo);
  //
  //   return todo;
  // }

  async getTodoById(id: number): Promise<Todo> {
    const found = await this.todoRepository.findOne(id);
    if (isUndefined(found)) {
      throw new NotFoundException(`Can't find Todo with id ${id}`);
    }

    return found;
  }

  // getTodoById(id: string): Todo {
  //   return this.todos.find((todo) => todo.id === id);
  // }
  //
  // deleteTodoById(id: string): void {
  //   this.todos = this.todos.filter((todo) => todo.id !== id);
  // }
  //
  // updateTodoStatus(id: string, status: TodoStatus): Todo {
  //   const todo = this.getTodoById(id);
  //   todo.status = status;
  //
  //   return todo;
  // }
}

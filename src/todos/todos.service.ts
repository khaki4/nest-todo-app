import { Injectable } from '@nestjs/common';
import { Todo, TodoStatus } from './todo.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];

  getAllBoards(): Todo[] {
    return this.todos;
  }

  createTodo(title: string, description: string) {
    const todo: Todo = {
      id: uuid(),
      title,
      description,
      status: TodoStatus.OPEN,
    };

    this.todos.push(todo);
    return todo;
  }
}

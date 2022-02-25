import { Injectable } from '@nestjs/common';
import { Todo, TodoStatus } from './todo.model';
import { v1 as uuid } from 'uuid';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];

  getAllBoards(): Todo[] {
    return this.todos;
  }

  createTodo(createTodoDto: CreateTodoDto): Todo {
    const { title, description } = createTodoDto;
    const todo: Todo = {
      id: uuid(),
      title,
      description,
      status: TodoStatus.OPEN,
    };

    this.todos.push(todo);
    return todo;
  }

  getTodoById(id: string): Todo {
    return this.todos.find((todo) => todo.id === id);
  }
}

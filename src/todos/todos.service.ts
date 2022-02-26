import { Injectable } from '@nestjs/common';
import { TodoStatus } from './todo-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
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
  //
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

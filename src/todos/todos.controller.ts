import { Body, Controller, Get, Post } from '@nestjs/common';
import { Todo } from './todo.model';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get('/')
  getAllBoards(): Todo[] {
    return this.todoService.getAllBoards();
  }

  @Post()
  createTodo(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Todo {
    return this.todoService.createTodo(title, description);
  }
}

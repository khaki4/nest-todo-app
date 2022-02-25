import { Controller, Get } from '@nestjs/common';
import { Todo } from './todo.model';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get()
  getAllBoards(): Todo[] {
    return this.todoService.getAllBoards();
  }
}

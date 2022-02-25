import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.model';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get('/')
  getAllBoards(): Todo[] {
    return this.todoService.getAllBoards();
  }

  @Get('/:id')
  getTodoById(@Param('id') id: string): Todo {
    return this.todoService.getTodoById(id);
  }

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto): Todo {
    return this.todoService.createTodo(createTodoDto);
  }
}

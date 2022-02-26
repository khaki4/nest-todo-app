import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { isUndefined } from 'lodash';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoStatusValidationPipe } from './pipes/todo-status-validation.pipe';
import { TodoStatus } from './todo-status.enum';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get('/:id')
  getTodoById(@Param('id') id: number): Promise<Todo> {
    return this.todoService.getTodoById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.createTodo(createBoardDto);
  }
}

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
import { Todo, TodoStatus } from './todo.model';
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
    const found = this.todoService.getTodoById(id);
    if (isUndefined(found)) {
      throw new NotFoundException(`Cant't find Todo with id - ${id}`);
    }

    return found;
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTodo(@Body() createTodoDto: CreateTodoDto): Todo {
    return this.todoService.createTodo(createTodoDto);
  }

  @Delete('/:id')
  deleteTodoById(@Param('id') id: string): Todo[] {
    const found = this.getTodoById(id);
    return this.todoService.deleteTodoById(found.id);
  }

  @Patch('/:id/status')
  updateTodoStatus(
    @Param('id') id: string,
    @Body('status', TodoStatusValidationPipe) status: TodoStatus,
  ): Todo {
    return this.todoService.updateTodoStatus(id, status);
  }
}

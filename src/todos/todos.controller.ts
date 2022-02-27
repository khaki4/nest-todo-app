import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoStatusValidationPipe } from './pipes/todo-status-validation.pipe';
import { TodoStatus } from './todo-status.enum';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('todos')
@UseGuards(AuthGuard())
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get()
  getAllTodos(@GetUser() user: User): Promise<Todo[]> {
    return this.todoService.getAllTodos(user);
  }

  @Get('/:id')
  getTodoById(@Param('id') id: number): Promise<Todo> {
    return this.todoService.getTodoById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTodo(
    @Body() createBoardDto: CreateTodoDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    return this.todoService.createTodo(createBoardDto, user);
  }

  @Patch('/:id/status')
  updateTodoStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TodoStatusValidationPipe) status: TodoStatus,
  ): Promise<Todo> {
    return this.todoService.updateTodoStatus(id, status);
  }

  @Delete('/:id')
  deleteTodo(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.todoService.deleteBoard(id);
  }
}

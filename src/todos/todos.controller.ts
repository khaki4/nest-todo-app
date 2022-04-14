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
  Logger,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoStatusValidationPipe } from './pipes/todo-status-validation.pipe';
import { TodoStatus } from './todo-status.enum';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { DeleteResult } from 'typeorm';

@Controller('todos')
@UseGuards(AuthGuard())
export class TodosController {
  private logger = new Logger('TodoController');
  constructor(private todoService: TodosService) {}

  @Get()
  getAllTodos(@GetUser() user: User): Promise<Todo[]> {
    this.logger.verbose(`User ${user.username} trying to get all todos`);
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
  ): Promise<Todo[]> {
    this.logger.verbose(
      `User ${user.username} is creating new todo.
      Payload: ${JSON.stringify(createBoardDto)}
      `,
    );
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
  deleteTodo(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<DeleteResult> {
    return this.todoService.deleteTodo(id, user);
  }
}

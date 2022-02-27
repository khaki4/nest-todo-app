import { EntityRepository, Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoStatus } from './todo-status.enum';
import { User } from '../auth/user.entity';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  async createTodo(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
    const { title, description } = createTodoDto;
    const todo = this.create({
      title,
      description,
      status: TodoStatus.OPEN,
      user,
    });

    await this.save(todo);
    return todo;
  }

  async updateTodo(todo: Todo, status: TodoStatus): Promise<Todo> {
    todo.status = status;
    await this.save(todo);
    return todo;
  }
}

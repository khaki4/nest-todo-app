import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosService {
  private todos = [];

  getAllBoards() {
    return this.todos;
  }
}

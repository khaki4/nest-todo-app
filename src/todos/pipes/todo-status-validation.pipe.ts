import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TodoStatus } from '../todo-status.enum';

export class TodoStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [
    TodoStatus.OPEN,
    TodoStatus.IN_PROGRESS,
    TodoStatus.DONE,
  ];

  transform(value: any) {
    const upperCasedValue = value.toUpperCase();
    if (!this.isStatusValid(upperCasedValue)) {
      throw new BadRequestException(`${value} is an invalid status`);
    }

    return upperCasedValue;
  }

  private isStatusValid(status: any) {
    return this.StatusOptions.includes(status);
  }
}

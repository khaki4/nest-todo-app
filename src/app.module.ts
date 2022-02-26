import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), TodosModule],
})
export class AppModule {}

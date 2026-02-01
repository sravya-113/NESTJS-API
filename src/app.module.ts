import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/task.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: process.env.NODE_ENV === 'production' ? '/tmp/db.sqlite' : 'db.sqlite',
            entities: [User, Task],
            synchronize: true, // Auto-create tables (dev only)
            autoLoadEntities: true,
        }),
        AuthModule,
        UsersModule,
        TasksModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }

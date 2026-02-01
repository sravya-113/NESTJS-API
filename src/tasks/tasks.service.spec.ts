import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, UserRole } from '../users/user.entity';
import { NotFoundException } from '@nestjs/common';

const mockTasksRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

const mockUser: User = {
  id: 1,
  username: 'TestUser',
  password: 'TestPassword',
  roles: UserRole.USER,
  tasks: [],
};

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: getRepositoryToken(Task), useValue: mockTasksRepository },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTasks', () => {
    it('should return an array of tasks', async () => {
      mockTasksRepository.find.mockResolvedValue(['someTask']);
      const result = await service.getTasks(mockUser);
      expect(result).toEqual(['someTask']);
    });
  });

  describe('createTask', () => {
    it('should successfully create a task', async () => {
      const mockTaskDto = { title: 'Test', description: 'Desc' };
      mockTasksRepository.create.mockReturnValue({ ...mockTaskDto, status: TaskStatus.OPEN, user: mockUser });
      mockTasksRepository.save.mockResolvedValue(null);

      const result = await service.createTask(mockTaskDto, mockUser);
      expect(result.title).toEqual('Test');
      expect(result.status).toEqual(TaskStatus.OPEN);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      mockTasksRepository.delete.mockResolvedValue({ affected: 1 });
      await expect(service.deleteTask(1, mockUser)).resolves.not.toThrow();
    });

    it('should throw an error if task not found', async () => {
      mockTasksRepository.delete.mockResolvedValue({ affected: 0 });
      await expect(service.deleteTask(1, mockUser)).rejects.toThrow(NotFoundException);
    });
  });
});

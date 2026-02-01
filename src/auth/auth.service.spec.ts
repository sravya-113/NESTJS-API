import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../users/user.entity';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

const mockUsersService = {
  findOne: jest.fn(),
  create: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user data if password matches', async () => {
      const password = 'password';
      const user = { username: 'test', password: 'hashedPassword' };
      mockUsersService.findOne.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser('test', password);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: p, ...expected } = user;
      expect(result).toEqual(expected);
    });

    it('should return null if password does not match', async () => {
      mockUsersService.findOne.mockResolvedValue({ username: 'test', password: 'hashedPassword' });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await service.validateUser('test', 'wrongPrice');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token', async () => {
      const user = { username: 'test', id: 1, roles: UserRole.USER };
      mockJwtService.sign.mockReturnValue('token');

      const result = await service.login(user);
      expect(result).toEqual({ access_token: 'token' });
    });
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const dto = { username: 'test', password: 'password' };
      const expectedUser = { id: 1, username: 'test', roles: UserRole.USER };
      (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed');

      const createdUser = { ...expectedUser, password: 'hashed' };
      mockUsersService.create.mockResolvedValue(createdUser);

      const result = await service.register(dto);
      expect(result).toEqual(expectedUser);
    });
  });
});

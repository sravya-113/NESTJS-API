import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../users/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && (await bcrypt.compare(pass, user.password))) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id, roles: user.roles };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(userDto: any) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(userDto.password, salt);

        // Default to USER role if not provided or valid
        const role = userDto.role === 'admin' ? UserRole.ADMIN : UserRole.USER;

        try {
            const newUser = await this.usersService.create({
                ...userDto,
                password: hashedPassword,
                roles: role,
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = newUser;
            return result;
        } catch (e) {
            throw new Error('User creation failed, likely duplicate username');
        }
    }
}

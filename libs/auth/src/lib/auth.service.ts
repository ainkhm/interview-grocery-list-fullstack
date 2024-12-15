import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@grocery-app/user';
import { IUserView } from '@grocery-app/interfaces';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<IUserView | null> {
    const user = await this.userService.findOne({ email });

    if (!user) {
      return null;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Incorrect password');
    }

    return user;
  }

  async login(user: IUserView): Promise<{ access_token: string }> {
    const payload: IUserView = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

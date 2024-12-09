import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@grocery-app/prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserView, IUser } from '@grocery-app/interfaces';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  private trimUser(user: IUser): IUserView {
    const { password, ...userView } = user;
    return userView;
  }

  async create(createUserDto: CreateUserDto): Promise<IUserView> {
    const { name, email, password, role } = createUserDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const newUser = await this.prisma.user.create({
      data: { name, email, password, role },
    });

    return this.trimUser(newUser);
  }

  async findAll(): Promise<IUserView[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return users;
  }

  async findOne({
    id,
    email,
  }: {
    id?: string;
    email?: string;
  }): Promise<IUser | null> {
    try {
      const user = id
        ? await this.prisma.user.findUnique({ where: { id } })
        : email
          ? await this.prisma.user.findUnique({ where: { email } })
          : null;

      return user;
    } catch (err) {
      throw new BadRequestException(`Unable to find the user. ${String(err)}`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUserView> {
    try {
      const { confirmPassword, ...userData } = updateUserDto;
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: userData,
      });

      return this.trimUser(updatedUser);
    } catch (err) {
      throw new BadRequestException('Unable to update user. Please try again.');
    }
  }

  async remove(id: string): Promise<string | null> {
    const user = await this.findOne({ id });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    await this.prisma.user.delete({ where: { id } });

    return `User ${user.name} has been removed`;
  }
}

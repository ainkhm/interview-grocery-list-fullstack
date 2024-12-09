import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiBearerAuth } from '@nestjs/swagger';

import { UserEmailGuard } from './guards/user-email.guard';
import { JwtAuthGuard } from '@grocery-app/auth';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserView } from '@grocery-app/interfaces';

import {
  TransformPasswordInterceptor,
  TransformUserInterceptor,
} from './interceptors';

@Controller({ version: '1', path: 'users' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(UserEmailGuard)
  @UseInterceptors(TransformPasswordInterceptor, TransformUserInterceptor)
  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'user@example.com',
        },
        password: {
          type: 'string',
          example: 'pass123!',
          minLength: 8,
        },
        confirmPassword: {
          type: 'string',
          example: 'pass123!',
        },
        name: {
          type: 'string',
          example: 'Andrey',
        },
        role: {
          type: 'string',
          example: 'Admin || User',
        },
      },
      required: ['email', 'password', 'confirmPassword', 'name', 'role'],
    },
  })
  create(@Body() createUserDto: CreateUserDto): Promise<IUserView> {
    return this.userService.create(createUserDto);
  }

//   @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll(): Promise<IUserView[]> {
    return this.userService.findAll();
  }

  @UseInterceptors(TransformUserInterceptor)
//   @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<IUserView | null> {
    return this.userService.findOne({ id });
  }

  @UseGuards(UserEmailGuard)
//   @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(TransformPasswordInterceptor, TransformUserInterceptor)
  @Patch(':id')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'user@example.com',
        },
        password: {
          type: 'string',
          example: 'pass123!',
          minLength: 8,
        },
        confirmPassword: {
          type: 'string',
          example: 'pass123!',
        },
        name: {
          type: 'string',
          example: 'Andrey',
        },
      },
      required: ['email', 'password', 'confirmPassword', 'name'],
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IUserView> {
    return this.userService.update(id, updateUserDto);
  }

//   @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string): Promise<string | null> {
    return this.userService.remove(id);
  }
}

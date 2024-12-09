import { Controller, Get, Post, UseGuards, Req } from '@nestjs/common';

import { ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService, LocalAuthGuard, JwtAuthGuard } from '@grocery-app/auth';
import { IUserView, Request } from '@grocery-app/interfaces';

@Controller({ version: '1' })
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'User Login',
    description: 'Authenticate user and receive an access token.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: 'The email address of the user',
          example: 'user@example.com',
        },
        password: {
          type: 'string',
          description: 'The password of the user',
          example: 'pass123!',
          minLength: 8,
        },
      },
      required: ['email', 'password'],
    },
  })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req: Request): Promise<{ access_token: string } | null> {
    return req.user ? this.authService.login(req.user as IUserView) : null;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  async getProfile(@Req() req: Request): Promise<IUserView> {
    return req.user as IUserView;
  }

  @Post('auth/logout')
  logout(@Req() req: Request): string {
    return req.logout();
  }
}

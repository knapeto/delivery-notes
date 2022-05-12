import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { User } from '../user/entities/user.entity';
import { validate } from './auth.validate';

export enum AuthType {
  User = 'User',
  Admin = 'Admin',
}
interface UserResponse {
  user: User;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const hasRole = (roles: string[], response: any): boolean => {
      const { user }: UserResponse = response;

      if (roles.includes(AuthType.Admin) && !user.isAdmin) {
        return false;
      }

      console.log(user);

      return roles.includes(AuthType.User) && user.role === AuthType.User;
    };
    return validate(hasRole, this.reflector, context);
  }
}

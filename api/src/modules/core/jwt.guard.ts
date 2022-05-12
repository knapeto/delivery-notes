import { AuthGuard } from '@nestjs/passport';
import { AuthenticationError } from 'apollo-server-core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: any) {
    let request;
    if (context.contextType === 'http') {
      request = context.switchToHttp().getRequest();
    } else {
      const ctx = GqlExecutionContext.create(context);
      request = ctx.getContext().req;
    }

    return request;
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new AuthenticationError('Could not authenticate with token');
    }
    return user;
  }
}

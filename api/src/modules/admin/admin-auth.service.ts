import { IncomingMessage, ServerResponse } from 'http';
import { and, rule, shield } from 'graphql-shield';

import { IMiddlewareGenerator } from 'graphql-middleware';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';

export interface UserContextType {
  id: string;
  authenticated: boolean;
}

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  guard(): IMiddlewareGenerator<IncomingMessage, ServerResponse, any> {
    const isAuthenticated = rule({ cache: 'contextual' })(
      async (parent, args, ctx) => {
        if (
          ctx.req.body.operationName === 'LoginMutation' &&
          !ctx.user?.authenticated
        ) {
          return true;
        }
        return ctx.user && ctx.user.authenticated;
      },
    );

    const defaultRule = and(isAuthenticated);

    return shield(
      {},
      {
        fallbackRule: defaultRule,
        debug: true,
      },
    );
  }

  async decodeUser(req: Request): Promise<UserContextType> {
    try {
      let accessToken = req?.cookies?.access_token;
      if (req.headers.authorization) {
        accessToken = req.headers.authorization.replace('Bearer ', '');
      }

      const { id } = this.jwtService.verify(accessToken) as any;

      const user = await this.prisma.user.findFirst({
        where: {
          id,
          deletedAt: null,
        },
        select: {
          id: true,
        },
      });

      return {
        ...user,
        authenticated: !!user,
      };
    } catch (e) {
      return {
        id: 'anonymous',
        authenticated: false,
      };
    }
  }
}

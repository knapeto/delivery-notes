import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UseGuards, applyDecorators } from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtAuthGuard } from './jwt.guard';
import { OptionalJwtAuthGuard } from './optional-jwt.guard';
import { Response } from 'express';
import { User } from '@prisma/client';

export const Authorize = () => {
  return applyDecorators(UseGuards(JwtAuthGuard));
};

export const OptionalAuthorization = () => {
  return applyDecorators(UseGuards(OptionalJwtAuthGuard));
};

export const ResGql = createParamDecorator(
  (data: unknown, context: ExecutionContext): Response =>
    GqlExecutionContext.create(context).getContext().res,
);

export const GqlUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx.req && ctx.req.user;
  },
);

import { ExecutionContext, ForbiddenException } from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';

export function validate(
  hasPrivilege: CallableFunction,
  reflector: Reflector,
  context: ExecutionContext,
) {
  const type = reflector.get<string[]>('roles', context.getHandler());
  if (!type) {
    return true;
  }
  const request = GqlExecutionContext.create(context).getContext().req;
  const user = request.user;
  if (!(user && hasPrivilege(type, request))) {
    throw new ForbiddenException(
      "You don't have permission to perform this action",
    );
  }
  return true;
}

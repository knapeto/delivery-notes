import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<string, Date> {
  description = 'Date custom scalar type';

  parseValue(value: number): Date {
    return new Date(value);
  }

  serialize(value: Date): string {
    return dayjs(value).format();
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
}

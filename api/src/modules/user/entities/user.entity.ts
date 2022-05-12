import { ObjectType, PartialType } from '@nestjs/graphql';

import { Exclude } from 'class-transformer';
import { User as UserGenerated } from '../../../@generated/user/user.model';

@ObjectType()
export class User extends PartialType(UserGenerated) {
  @Exclude({ toPlainOnly: true })
  role?: string;
}

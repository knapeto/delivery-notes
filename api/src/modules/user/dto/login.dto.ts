import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../../../@generated/user/user.model';

@ObjectType()
export class LoginResponse {
  @Field(() => User)
  user: User;

  @Field(() => String)
  access_token: string;
}

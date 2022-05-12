import { Field, ObjectType } from 'type-graphql';

import { User } from '../../../@generated/type-graphql';

@ObjectType()
export class LoginResponse {
  @Field(() => User)
  user: User;

  @Field(() => String)
  access_token: string;
}

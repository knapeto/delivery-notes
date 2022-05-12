import { ArgsType, Field, InputType } from 'type-graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import { Exclude } from 'class-transformer';
import { UserWhereUniqueInput } from '../../../@generated/type-graphql';

@InputType()
export class UserInputDto {
  @IsOptional()
  @Length(2, 35, { message: 'LENGTH_RANGE_2_TO_35' })
  @Field(() => String, { nullable: true })
  firstName?: string;

  @IsOptional()
  @Length(2, 35, { message: 'LENGTH_RANGE_2_TO_35' })
  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => Boolean, { nullable: true })
  presetPassword?: boolean;

  @Field(() => Boolean, { nullable: true })
  isAdmin?: boolean;
}

@InputType()
export class CreateUserInputDto extends UserInputDto {
  @IsNotEmpty({ message: 'VALUE_SHOULD_EXISTS' })
  @Field(() => String)
  password: string;

  @IsEmail({}, { message: 'WRONG_EMAIL_FORMAT' })
  @MaxLength(70, { message: 'MAX_LENGTH_70' })
  @Field(() => String)
  email: string;

  @Exclude()
  @Field(() => String, { nullable: true })
  tokenSalt?: string;

  @Field(() => Boolean, { nullable: true })
  isAd: boolean;
}

@InputType()
export class UpdateUserInputDto extends UserInputDto {
  @IsOptional()
  @Field(() => String, { nullable: true })
  password?: string;

  @IsEmail({}, { message: 'WRONG_EMAIL_FORMAT' })
  @MaxLength(70, { message: 'MAX_LENGTH_70' })
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => Boolean, { nullable: true })
  isAdmin?: boolean;

  @Field(() => Boolean, { nullable: true })
  isAd?: boolean;
}

@ArgsType()
export class CreateUserArgs {
  @Field(() => CreateUserInputDto)
  @ValidateNested()
  data: CreateUserInputDto;
}

@ArgsType()
export class UpdateUserArgs {
  @Field(() => UpdateUserInputDto)
  @ValidateNested()
  data: UpdateUserInputDto;

  @Field(() => UserWhereUniqueInput)
  where: UserWhereUniqueInput;
}

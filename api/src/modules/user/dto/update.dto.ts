import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class UpdateUserInputDto {
  @IsEmail({}, { message: 'WRONG_EMAIL_FORMAT' })
  @MaxLength(70, { message: 'MAX_LENGTH_70' })
  @IsOptional()
  @Field(() => String, { nullable: true })
  email?: string;

  @IsOptional()
  @Length(2, 35, { message: 'LENGTH_RANGE_2_TO_35' })
  @Field(() => String, { nullable: true })
  firstName?: string;

  @IsOptional()
  @Length(2, 35, { message: 'LENGTH_RANGE_2_TO_35' })
  @Field(() => String, { nullable: true })
  lastName?: string;
}

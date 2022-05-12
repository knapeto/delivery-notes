import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { LoginResponse } from './dto/login.dto';
import { Injectable } from '@nestjs/common';
import { AuthType } from '../core/role.guard';
import { SharedService } from '../shared/shared.service';

@Injectable()
@Resolver()
export class AdminAuthResolver {
  constructor(private readonly sharedService: SharedService) {}

  @Mutation(() => LoginResponse)
  public async login(
    @Arg('email')
    email: string,
    @Arg('password')
    password: string,
    @Ctx() ctx: any,
  ): Promise<LoginResponse> {
    return this.sharedService.login(email, password, AuthType.Admin, ctx.res);
  }
}

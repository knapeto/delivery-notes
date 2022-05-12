import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module, Provider } from '@nestjs/common';

import { AdminAuthModule } from './admin-auth.module';
import { AdminAuthService } from './admin-auth.service';
import { DeliveryNotesResolver } from '../deliveryNotes/typegraphql/delivery-notes.resolver';
import { GraphQLSchema } from 'graphql';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { TypeGraphQLModule } from 'typegraphql-nestjs';
import { UserModule } from '../user/user.module';
import { UserResolver } from '../user/typegraphql/user.resolver';
import { UserService } from '../user/user.service';
import { applyMiddleware } from 'graphql-middleware';
import { join } from 'path';
import { resolvers } from '../../@generated/type-graphql';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
    TypeGraphQLModule.forRootAsync({
      imports: [PrismaModule, UserModule, AdminAuthModule],
      inject: [PrismaService, UserService, AdminAuthService],
      useFactory: async (
        prismaService: PrismaService,
        userService: UserService,
        oauthGuard: AdminAuthService,
      ) => {
        const options = {
          emitSchemaFile: join(process.cwd(), 'src/admin-schema.gql'),
          path: 'admin/graphql',
          playground: {
            settings: {
              'request.credentials': 'same-origin',
            },
          },
          transformSchema: (schema: GraphQLSchema) => {
            schema = applyMiddleware(schema, oauthGuard.guard());
            return schema;
          },
          cors: {
            credentials: true,
            origin: true,
          },
          uploads: false,
          introspection: true,
          installSubscriptionHandlers: true,
          debug: true,
          context: async ({ req, res }) => {
            return {
              req,
              res,
              prisma: prismaService,
              userService,
              user: await oauthGuard.decodeUser(req),
            };
          },
        };
        return options;
      },
    }),
  ],
  providers: [
    ...(resolvers as unknown as Provider<any>[]),
    UserResolver,
    DeliveryNotesResolver,
  ],
})
export class AdminModule {}

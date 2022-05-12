import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { json, urlencoded } from 'body-parser';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { graphqlUploadExpress } from 'graphql-upload';
import { values } from 'ramda';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errorResult = {};
        validationErrors.map((error) => {
          errorResult[error.property] = values(error.constraints);
        });
        return new BadRequestException(errorResult);
      },
    }),
  );

  const rawBodyBuffer = (req, res, buffer, encoding) => {
    if (!req.headers['stripe-signature']) {
      return;
    }

    if (buffer && buffer.length) {
      req.rawBody = buffer.toString(encoding || 'utf8');
    }
  };

  app.use(json({ limit: '50mb', verify: rawBodyBuffer }));
  app.use(
    urlencoded({
      verify: rawBodyBuffer,
      limit: '50mb',
      extended: true,
      parameterLimit: 1000000000,
    }),
  );
  app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

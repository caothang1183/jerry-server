import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = ['http://localhost:3000'];
  const corsOptions: cors.CorsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log('deny', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    preflightContinue: true,
    methods: 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE',
  };

  app.use(cors(corsOptions));
  // app.use(logger);
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();

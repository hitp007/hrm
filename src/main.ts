import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RewriteFrames } from "@sentry/integrations";
// import { TransformInterceptor } from './Interceptors/transform.interceptor';
import * as Sentry from "@sentry/node";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
// https://02dfe9021ae34c2eb9958147410605f8@o4504315562426368.ingest.sentry.io/4504315565768705
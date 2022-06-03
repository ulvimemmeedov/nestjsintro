import { INestApplication, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const PORT = process.env.PORT || 5000;


async function bootstrap(): Promise<void> {
    const app: INestApplication = await (await NestFactory.create(AppModule));
    app.enableCors();
    app.enableVersioning({
        type: VersioningType.MEDIA_TYPE,
        key: 'v=',
    });
    await app.listen(PORT);
}
bootstrap();
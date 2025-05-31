import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const PORT = process.env.PORT || 3000;

	app.useGlobalPipes(
		new ValidationPipe({ whitelist: true, transform: true })
	);

	app.use(helmet());

	app.enableCors({
		origin: '*',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	});

	await app.listen(PORT, () => {
		console.log(`Server started on port ${PORT}`);
	});
}
bootstrap();

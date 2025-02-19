import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const PORT = process.env.PORT || 3000;

	app.useGlobalPipes(
		new ValidationPipe({ whitelist: true, transform: true })
	);

	await app.listen(PORT, () => {
		console.log(`Server started on port ${PORT}`);
	});
}
bootstrap();

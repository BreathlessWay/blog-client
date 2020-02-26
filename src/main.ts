import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

import * as nunjucks from 'nunjucks';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as moment from 'moment';

import { join } from 'path';

import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { CustomConfigService } from './config/config.service';

(async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
		}),
	);

	app.use(new LoggerMiddleware().use);

	app.use(compression());
	// 可以帮助保护您的应用免受一些众所周知的 Web 漏洞的影响
	app.use(helmet());
	// 为了保护您的应用程序免受暴力攻击，您必须实现某种速率限制
	app.use(
		rateLimit({
			windowMs: 15 * 60 * 1000, // 15 minutes
			max: 100, // limit each IP to 100 requests per windowMs
		}),
	);

	app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/public' });
	app.setBaseViewsDir(join(__dirname, '..', 'views'));

	const config: CustomConfigService = app.get(CustomConfigService);

	const env = nunjucks.configure(join(__dirname, '..', 'views'), {
		autoescape: false,
		express: app,
		watch: config.isDev,
	});

	env.addFilter('picUrl', function(str) {
		return `${config.prefixUrl}${str}`;
	});

	env.addFilter('formatTime', function(str) {
		return moment(str).format('YYYY年MM月DD日');
	});

	app.setViewEngine('njk');

	await app.listen(config.port);
})();

import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { join } from 'path';

import { HomeController } from './home/home.controller';
import { HomeService } from './home/home.service';

import { CustomConfigService } from './config/config.service';
import { AppController } from './app.controller';

@Module({
	imports: [
		HttpModule,
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: join(__dirname, '../env', `.${process.env.NODE_ENV}.env`),
		}),
	],
	controllers: [HomeController, AppController],
	providers: [HomeService, CustomConfigService],
})
export class AppModule {}

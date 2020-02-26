import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { join } from 'path';

import { HomeController } from './home/home.controller';
import { HomeService } from './home/home.service';

import { CustomConfigService } from './config/config.service';
import { AppController } from './app.controller';
import { CommonService } from './common/common.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ReadController } from './read/read.controller';
import { ReadService } from './read/read.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: join(__dirname, '../env', `.${process.env.NODE_ENV}.env`),
		}),
		HttpModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: CustomConfigService) => ({
				timeout: 5000,
				maxRedirects: 5,
				baseURL: configService.basicUrl,
			}),
			inject: [CustomConfigService],
			extraProviders: [CustomConfigService],
		}),
	],
	controllers: [HomeController, AppController, UserController, ReadController],
	providers: [
		HomeService,
		CustomConfigService,
		CommonService,
		UserService,
		ReadService,
	],
})
export class AppModule {}

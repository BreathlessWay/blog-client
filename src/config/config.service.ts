import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

export enum EnumEnv {
	development = 'development',
	production = 'production',
}

@Injectable()
export class CustomConfigService {
	constructor(private configService: ConfigService) {}

	get env(): EnumEnv {
		return this.configService.get('NODE_ENV');
	}

	get isDev() {
		return this.env === EnumEnv.development;
	}

	get isProd() {
		return this.env === EnumEnv.production;
	}

	get basicUrl(): string {
		return this.configService.get('BASIC_URL');
	}

	get port(): number {
		const port = this.configService.get('PORT');
		return parseInt(port, 10);
	}
}

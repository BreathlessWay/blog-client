import { HttpService, Injectable } from '@nestjs/common';

import { CustomConfigService } from '../config/config.service';

@Injectable()
export class HomeService {
	constructor(
		private readonly httpService: HttpService,
		private readonly configService: CustomConfigService,
	) {}

	get basicUrl(): string {
		return this.configService.basicUrl;
	}

	getMenu() {
		const { httpService, basicUrl } = this;
		return httpService.get(`${basicUrl}/soup`);
	}
}

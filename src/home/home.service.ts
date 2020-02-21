import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class HomeService {
	constructor(private readonly httpService: HttpService) {}

	getMenu() {
		const { httpService } = this;
		return httpService.get(`/menu`);
	}
}

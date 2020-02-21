import { Controller, Get, Render } from '@nestjs/common';

import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
	constructor(private readonly homeService: HomeService) {}

	@Get()
	@Render('home')
	async getAll() {
		const data = await this.homeService.getMenu().toPromise();
		return {
			title: '首页',
			description: '个人博客',
			keywords: '个人博客 首页 ',
		};
	}
}

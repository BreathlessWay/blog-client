import { Controller, Get, Render } from '@nestjs/common';

import { HomeService } from './home.service';
import { EMenuType, HomeResult, MenuListType } from './home.dto';

@Controller(EMenuType.home)
export class HomeController {
	constructor(private readonly homeService: HomeService) {}

	@Get()
	@Render('home')
	async getMenu(): Promise<HomeResult> {
		const data = await this.homeService.getMenu().toPromise();
		let menus: MenuListType = data.data?.data?.list ?? [];
		menus = menus.filter(menu => menu.show && !menu.onlyAdmin);
		console.log(menus);
		return {
			title: '首页',
			description: '个人博客',
			keywords: '个人博客 首页 ',
			menus,
		};
	}
}

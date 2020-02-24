import { Controller, Get, Render } from '@nestjs/common';

import { HomeService } from './home.service';
import { EMenuType, HomeResult } from './home.dto';
import { MenuService } from '../common/menu.service';
import { ErrorHandle } from '../common/errorHandle';

@Controller(EMenuType.home)
export class HomeController {
	constructor(
		private readonly homeService: HomeService,
		private readonly menuService: MenuService,
	) {}

	@Get()
	@Render('home')
	@ErrorHandle()
	async getMenu(): Promise<HomeResult> {
		const menus = await this.menuService.getMenu();
		console.log(menus);
		return {
			title: '首页',
			description: '个人博客',
			keywords: '个人博客 首页 ',
			menus,
		};
	}
}

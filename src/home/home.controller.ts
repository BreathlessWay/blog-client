import { Controller, Get, Render } from '@nestjs/common';

import { HomeService } from './home.service';
import { CommonService } from '../common/common.service';

import { ErrorHandle } from '../common/errorHandle';

import { HomeResult } from './home.dto';
import { EMenuType } from '../common/common.dto';

@Controller(EMenuType.home)
export class HomeController {
	constructor(
		private readonly homeService: HomeService,
		private readonly commonService: CommonService,
	) {}

	@Get()
	@Render('home')
	@ErrorHandle()
	async renderHome(): Promise<HomeResult> {
		const menus = await this.commonService.getMenu();
		const homeUserInfo = await this.homeService.getHomeUserInfo();

		return {
			title: '首页',
			description: '个人博客',
			keywords: '个人博客 首页 ',
			menus,
			homeUserInfo,
		};
	}
}

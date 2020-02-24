import { Controller, Get, Render } from '@nestjs/common';

import { HomeService } from './home.service';
import { EMenuType, HomeResult } from './home.dto';
import { CommonService } from '../common/common.service';
import { ErrorHandle } from '../common/errorHandle';
import { CustomConfigService } from '../config/config.service';

@Controller(EMenuType.home)
export class HomeController {
	constructor(
		private readonly homeService: HomeService,
		private readonly commonService: CommonService,
		private readonly customConfigService: CustomConfigService,
	) {}

	@Get()
	@Render('home')
	@ErrorHandle()
	async renderHome(): Promise<HomeResult> {
		const menus = await this.commonService.getMenu();
		const homeUserInfo = await this.homeService.getHomeUserInfo();
		const basicUrl = this.customConfigService.basicUrl;

		return {
			title: '首页',
			description: '个人博客',
			keywords: '个人博客 首页 ',
			menus,
			homeUserInfo,
			basicUrl,
		};
	}
}

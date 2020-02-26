import { Controller, Get, Render } from '@nestjs/common';

import { UserService } from './user.service';
import { CommonService } from '../common/common.service';

import { ErrorHandle } from '../common/errorHandle';

import { EMenuType } from '../common/common.dto';
import { UserResult } from './user.dto';

@Controller(EMenuType.user)
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly commonService: CommonService,
	) {}

	@Get()
	@Render('user')
	@ErrorHandle()
	async renderUser(): Promise<UserResult> {
		const menus = await this.commonService.getMenu();
		const userUserInfo = await this.userService.getUserUserInfo();
		return {
			title: '我',
			description: '个人介绍',
			keywords: '个人博客 我 个人介绍 ',
			menus,
			userUserInfo,
		};
	}
}

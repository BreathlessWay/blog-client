import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Res,
} from '@nestjs/common';

import { Response } from 'express';

import { MenuService } from './common/menu.service';
import { ErrorHandle } from './common/errorHandle';

@Controller()
export class AppController {
	constructor(private readonly menuService: MenuService) {}

	@Get()
	@ErrorHandle()
	async getIndex(@Res() res: Response) {
		const menus = await this.menuService.getMenu();
		if (menus.length) {
			res.status(302).redirect(`/${menus[0].type}`);
		} else {
			throw new HttpException(
				'菜单列表不存在！',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}

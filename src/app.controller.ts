import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Res,
} from '@nestjs/common';

import { Response } from 'express';

import { CommonService } from './common/common.service';
import { ErrorHandle } from './common/errorHandle';

@Controller()
export class AppController {
	constructor(private readonly commonService: CommonService) {}

	@Get()
	@ErrorHandle()
	async getIndex(@Res() res: Response) {
		const menus = await this.commonService.getMenu();
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

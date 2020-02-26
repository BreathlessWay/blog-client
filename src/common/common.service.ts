import { HttpService, Injectable } from '@nestjs/common';

import { MenuListType, UserDetailType } from './common.dto';

@Injectable()
export class CommonService {
	constructor(private readonly httpService: HttpService) {}

	async getMenu(): Promise<MenuListType> {
		const { httpService } = this;
		const data = await httpService.get(`/menu`).toPromise();
		let menus: MenuListType = data.data?.data?.list ?? [];
		menus = menus.filter(menu => menu.show && !menu.onlyAdmin);
		return menus;
	}

	async getUserInfo(): Promise<UserDetailType | null> {
		const { httpService } = this;
		const data = await httpService.get('/user').toPromise();
		return data.data?.data ?? null;
	}
}

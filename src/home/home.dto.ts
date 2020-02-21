export type MenuItemType = {
	_id: string;
	name: string;
	type: string;
	show: boolean;
	onlyAdmin: boolean;
	sort: number;
	__v: number;
	createdAt: string;
	updatedAt: string;
};

export type MenuListType = Array<MenuItemType>;

export class HomeResult {
	title: string;
	description: string;
	keywords: string;
	menus: MenuListType;
}

export enum EMenuType {
	home = 'home',
	me = 'user',
	article = 'read',
	cat = 'contacts',
	photography = 'camera',
	statistics = 'fund',
}

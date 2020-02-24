import {
	FigureItemType,
	HomeUserInfoType,
	MenuListType,
	SocialListType,
} from '../common/common.dto';

export type HomeUserInfoFormatType = HomeUserInfoType & {
	personalFigure: FigureItemType | null;
	social: {
		ico: SocialListType;
		pic: SocialListType;
	};
};

export class HomeResult {
	title: string;
	description: string;
	keywords: string;
	menus: MenuListType;
	homeUserInfo: HomeUserInfoFormatType;
	basicUrl: string;
}

export enum EMenuType {
	home = 'home',
	me = 'user',
	article = 'read',
	cat = 'contacts',
	photography = 'camera',
	statistics = 'fund',
}

import {
	FigureItemType,
	MenuListType,
	UserUserInfoType,
} from '../common/common.dto';

export type UserUserInfoFormatType = UserUserInfoType & {
	hobbiesFigure: FigureItemType | null;
};

export class UserResult {
	title: string;
	description: string;
	keywords: string;
	menus: MenuListType;
	userUserInfo: UserUserInfoFormatType;
}

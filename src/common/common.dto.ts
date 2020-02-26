export enum EMenuType {
	home = 'home',
	user = 'user',
	read = 'read',
	contacts = 'contacts',
	camera = 'camera',
	fund = 'fund',
}

export type MenuItemType = {
	_id: string;
	name: string;
	type: EMenuType;
	show: boolean;
	onlyAdmin: boolean;
	sort: number;
	__v: number;
	createdAt: string;
	updatedAt: string;
};

export type MenuListType = Array<MenuItemType>;

export type SocialItemType = {
	icon: string;
	value: string;
	_id: string;
};

export type SocialListType = Array<SocialItemType>;

export type PersonalSkillItemType = {
	name: string;
	percent: number;
	color: string;
	_id: string;
};

export type PersonalSkillListType = Array<PersonalSkillItemType>;

export type FigureItemType = {
	title: string;
	intro: string;
	show: boolean;
	_id: string;
	url: string;
};

export type FigureListType = Array<FigureItemType>;

export type HomeUserInfoType = {
	en: string;
	zh: string;
	intro: string;
	resumeAlias: string;
	resumeUrl: string;
	resumeName: string;
};

export type UserUserInfoType = {
	personalTitle: string;
	personalInfo: string;
	personalIntro: string;
	personalSkill: PersonalSkillListType;
};

export type UserDetailType = HomeUserInfoType &
	UserUserInfoType & {
		_id: string;

		social: SocialListType;
		personalFigure: FigureListType;

		hobbiesFigure: FigureListType;

		rewardEnable: boolean;
		rewardTitle: string;
		zfbCode: string;
		wxCode: string;
	};

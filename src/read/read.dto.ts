import { MenuListType } from '../common/common.dto';
import { IsString } from 'class-validator';

export class ArticleListQuery {
	pageIndex?: number;

	keyword?: string;

	tagId?: string;
}

export class ArticleDetailParams {
	@IsString()
	id: string;
}

export type TagItemType = {
	count: number;
	showCount: number;
	_id: string;
	name: string;
	show: boolean;
	createdAt: string;
	updatedAt: string;
};

export enum EArticleStatus {
	hide,
	show,
}

export enum EArticleRenderType {
	richText = 'richText',
	markdown = 'markdown',
}

export type TagListType = Array<TagItemType>;

export type ArticleItemType = {
	visit: number;
	tags: TagListType;
	_id: string;
	title: string;
	intro: string;
	richTextHtml: string;
	status: EArticleStatus;
	renderType: EArticleRenderType;
	userId: string;
	createdAt: string;
	updatedAt: string;
};

export type ArticleListType = Array<ArticleItemType>;

export class ArticleResult {
	title: string;
	description: string;
	keywords: string;
	menus: MenuListType;
	tagList: TagListType;
	articleList: ArticleListType;
	keyword: string;
	hasPre: boolean;
	preQuery: string;
	hasNext: boolean;
	nextQuery: string;
	allShowCount: number;
}

export class ArticleDetailResult {
	title: string;
	description: string;
	keywords: string;
	menus: MenuListType;
	detail: {
		markdown: string;
		visit: number;
		_id: string;
		title: string;
		intro: string;
		richTextHtml: string;
		status: EArticleStatus;
		renderType: EArticleRenderType;
		userId: string;
		createdAt: string;
		updatedAt: string;
		tags: Array<string>;
		renderHtml: string;
	};
}

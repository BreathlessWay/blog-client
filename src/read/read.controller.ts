import { Controller, Get, Param, Query, Render, Res } from '@nestjs/common';

import { ReadService } from './read.service';
import { CommonService } from '../common/common.service';

import { ErrorHandle } from '../common/errorHandle';

import { Response } from 'express';
import { EMenuType } from '../common/common.dto';
import {
	ArticleDetailParams,
	ArticleDetailResult,
	ArticleListQuery,
	ArticleResult,
} from './read.dto';

@Controller(EMenuType.read)
export class ReadController {
	constructor(
		private readonly readService: ReadService,
		private readonly commonService: CommonService,
	) {}

	@Get()
	@Render('read')
	@ErrorHandle()
	async renderArticleList(
		@Query() query: ArticleListQuery,
	): Promise<ArticleResult> {
		const { pageIndex, tagId, keyword } = query;
		const menus = await this.commonService.getMenu(),
			tagList = await this.readService.getArticleTags(),
			articleList = await this.readService.getArticleList({
				pageIndex: Number(pageIndex) || 1,
				tagId,
				keyword,
			});

		return {
			title: '文章列表',
			description: '博客文章列表 ',
			keywords: '博客文章列表',
			menus,
			tagList,
			keyword,
			articleList: articleList.list,
			hasPre: articleList.hasPre,
			preQuery: articleList.preQuery,
			hasNext: articleList.hasNext,
			nextQuery: articleList.nextQuery,
			allCount: articleList.allCount,
		};
	}

	@Get('/detail/:id')
	@ErrorHandle()
	async renderDetail(
		@Res() response: Response,
		@Param() params: ArticleDetailParams,
	) {
		const { id } = params;
		const menus = await this.commonService.getMenu(),
			detail = await this.readService.getArticleDetail({ id }),
			reward = await this.readService.getRewardInfo();

		if (!detail) {
			response.redirect(`/${EMenuType.read}`);
			return;
		} else {
			response.render('detail', {
				title: '文章列表',
				description: '博客文章列表 ',
				keywords: '博客文章列表',
				menus,
				detail,
				reward,
			});
		}
	}
}

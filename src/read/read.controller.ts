import { Controller, Get, Query, Render } from '@nestjs/common';

import { ReadService } from './read.service';
import { CommonService } from '../common/common.service';

import { EMenuType } from '../common/common.dto';
import { ArticleListQuery, ArticleResult } from './read.dto';

@Controller(EMenuType.read)
export class ReadController {
	constructor(
		private readonly readService: ReadService,
		private readonly commonService: CommonService,
	) {}

	@Get()
	@Render('read')
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
}

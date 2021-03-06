import { HttpService, Injectable } from '@nestjs/common';

import { CommonService } from '../common/common.service';
import { CustomConfigService } from '../config/config.service';

import * as Qs from 'qs';
import * as marked from 'marked';
import * as hljs from 'highlight.js';

import {
	ArticleListType,
	EArticleRenderType,
	EArticleStatus,
	TagListType,
} from './read.dto';
import { RewardInfoType } from '../common/common.dto';

@Injectable()
export class ReadService {
	constructor(
		private readonly httpService: HttpService,
		private readonly commonService: CommonService,
		private readonly customConfigService: CustomConfigService,
	) {}

	async getArticleTags(): Promise<TagListType> {
		const data = await this.httpService.get('/tags').toPromise();
		const tagList = data.data?.data?.list ?? [];
		return tagList.filter(tag => tag.show);
	}

	async getArticleList({
		pageIndex,
		tagId,
		keyword,
	}: {
		pageIndex: number;
		tagId: string;
		keyword: string;
	}): Promise<{
		list: ArticleListType;
		hasNext: boolean;
		nextQuery: string;
		hasPre: boolean;
		preQuery: string;
		allShowCount: number;
	}> {
		let params: any = {
			pageIndex,
			pageSize: this.customConfigService.pageSize,
			status: 1,
		};
		if (tagId) {
			params.tags = [tagId];
		}
		if (keyword) {
			params.keyword = keyword;
		}
		params = Qs.stringify(params);
		const data = await this.httpService.get(`/article?${params}`).toPromise();
		let allShowCount = data.data?.data?.allShowCount ?? 0,
			count = data.data?.data?.count ?? 0,
			list = data.data?.data?.list ?? [];

		const hasNext = pageIndex * this.customConfigService.pageSize < count;

		const nextQuery: any = {
				pageIndex: pageIndex + 1,
			},
			preQuery: any = {
				pageIndex: pageIndex - 1,
			};

		if (tagId) {
			preQuery.tagId = tagId;
			nextQuery.tagId = tagId;
		}
		if (keyword) {
			preQuery.keyword = keyword;
			nextQuery.keyword = keyword;
		}

		return {
			list,
			hasNext,
			nextQuery: `?${Qs.stringify(nextQuery)}`,
			hasPre: pageIndex !== 1,
			preQuery: `?${Qs.stringify(preQuery)}`,
			allShowCount,
		};
	}

	async getArticleDetail({ id }: { id: string }) {
		const data = await this.httpService.get(`/article/${id}`).toPromise();
		const detail = data.data?.data ?? null;

		if (detail && detail.status === EArticleStatus.show) {
			if (detail.tags && detail.tags.length) {
				const hideDetail = detail.tags.some(tag => !tag.show);
				if (hideDetail) return null;
			}

			if (detail.renderType === EArticleRenderType.richText) {
				detail.renderHtml = detail.richTextHtml;
			}
			if (detail.renderType === EArticleRenderType.markdown) {
				marked.setOptions({
					renderer: new marked.Renderer(),
					gfm: true,
					breaks: false,
					pedantic: false,
					sanitize: false,
					smartLists: true,
					smartypants: false,
					highlight(code: string) {
						return hljs.highlightAuto(code).value;
					},
				});

				const renderer = new marked.Renderer();

				// 段落解析
				const paragraphParse = (text: string) => `<p>${text}</p>`;

				// 链接解析
				const linkParse = (href: string, title: string, text: string) => {
					return `<a href=${href} title=${title ||
						href} target='_blank'}>${text}</a>`;
				};

				renderer.paragraph = paragraphParse;
				renderer.link = linkParse;

				detail.renderHtml = `<article class="markdown-body">${marked(
					detail.markdown,
					{ renderer },
				)}</article>`;
			}
			return detail;
		}

		return null;
	}

	async getRewardInfo(): Promise<RewardInfoType> {
		const data = await this.commonService.getUserInfo();
		const result = {
			rewardEnable: false,
			rewardTitle: '',
			zfbCode: '',
			wxCode: '',
		};

		if (data) {
			result.rewardEnable = data.rewardEnable;
			result.rewardTitle = data.rewardTitle;
			result.zfbCode = data.zfbCode;
			result.wxCode = data.wxCode;
		}

		return result;
	}
}

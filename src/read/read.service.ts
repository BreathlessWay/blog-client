import { HttpService, Injectable } from '@nestjs/common';

import { CommonService } from '../common/common.service';

import * as Qs from 'qs';

import { ArticleListType, EArticleStatus, TagListType } from './read.dto';
import { RewardInfoType } from '../common/common.dto';

@Injectable()
export class ReadService {
	constructor(
		private readonly httpService: HttpService,
		private readonly commonService: CommonService,
	) {}

	async getArticleTags(): Promise<TagListType> {
		const data = await this.httpService.get('/tags').toPromise();
		return data.data?.data?.list ?? [];
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
		allCount: number;
	}> {
		let params: any = {
			pageIndex,
			pageSize: 6,
		};
		if (tagId) {
			params.tags = [tagId];
		}
		if (keyword) {
			params.keyword = keyword;
		}
		params = Qs.stringify(params);
		const data = await this.httpService.get(`/article?${params}`).toPromise();
		let allCount = data.data?.data?.allCount ?? 0,
			count = data.data?.data?.count ?? 0,
			list = data.data?.data?.list ?? [];
		list = list.filter(item => item.status);

		const hasNext = pageIndex * params.pageSize < count;

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
			allCount,
		};
	}

	async getArticleDetail({ id }: { id: string }) {
		const tags = await this.getArticleTags();
		const data = await this.httpService.get(`/article/${id}`).toPromise();
		const detail = data.data?.data ?? null;

		if (detail.status === EArticleStatus.show) {
			if (detail && detail.tags && detail.tags.length && tags && tags.length) {
				detail.tags = tags
					.map(tag => {
						if (detail.tags.includes(tag._id)) {
							return tag.name;
						}
					})
					.filter(value => value);
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

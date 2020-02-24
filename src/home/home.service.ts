import { Injectable } from '@nestjs/common';

import { CommonService } from '../common/common.service';
import { HomeUserInfoFormatType } from './home.dto';

@Injectable()
export class HomeService {
	constructor(private readonly commonService: CommonService) {}

	async getHomeUserInfo(): Promise<HomeUserInfoFormatType> {
		const data = await this.commonService.getUserInfo();
		const userInfo = {
			en: '',
			zh: '',
			intro: '',
			resumeAlias: '下载简历',
			resumeUrl: '',
			resumeName: '',
			personalFigure: null,
			social: {
				ico: [],
				pic: [],
			},
		};

		if (data) {
			userInfo.en = data.en;
			userInfo.zh = data.zh;
			userInfo.intro = data.intro;
			userInfo.resumeAlias = data.resumeAlias || '下载简历';
			userInfo.resumeUrl = data.resumeUrl;
			userInfo.resumeName = data.resumeName;
			if (data.personalFigure && data.personalFigure.length) {
				userInfo.personalFigure = data.personalFigure.find(item => item.show);
			}
			if (data.social && data.social.length) {
				data.social.forEach(item => {
					if (item && item.value && item.value.startsWith('http')) {
						userInfo.social.ico.push(item);
					} else {
						userInfo.social.pic.push(item);
					}
				});
			}
		}

		return userInfo;
	}
}

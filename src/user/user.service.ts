import { Injectable } from '@nestjs/common';

import { CommonService } from '../common/common.service';

import { UserUserInfoFormatType } from './user.dto';

@Injectable()
export class UserService {
	constructor(private readonly commonService: CommonService) {}

	async getUserUserInfo(): Promise<UserUserInfoFormatType> {
		const data = await this.commonService.getUserInfo();

		const result = {
			personalTitle: '',
			personalInfo: '',
			personalIntro: '',
			personalSkill: [],
			hobbiesFigure: null,
		};

		if (data) {
			result.personalTitle = data.personalTitle;
			result.personalInfo = data.personalInfo;
			result.personalIntro = data.personalIntro;
			if (data.personalSkill && data.personalSkill.length) {
				result.personalSkill = data.personalSkill;
			}
			if (data.hobbiesFigure && data.hobbiesFigure.length) {
				result.hobbiesFigure = data.hobbiesFigure.find(item => item.show);
			}
		}
		return result;
	}
}

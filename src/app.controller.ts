import { Controller, Get, Redirect } from '@nestjs/common';

import { EMenuType } from './home/home.dto';

@Controller()
export class AppController {
	@Get()
	@Redirect(`/${EMenuType.home}`, 301)
	getIndex() {}
}

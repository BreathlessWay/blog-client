import { HttpException, HttpStatus } from '@nestjs/common';

export function ErrorHandle() {
	return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
		const oldValue = descriptor.value;

		descriptor.value = async function() {
			try {
				return await oldValue.apply(this, arguments);
			} catch (e) {
				let url = '',
					method = '',
					status = HttpStatus.INTERNAL_SERVER_ERROR,
					message = e.message || '请求失败！';
				const config = e.config,
					response = e.response;
				if (config && response) {
					url = config.baseURL + config.url;
					method = config.method;
					status = response.status;
					message = `请求地址：${url}, 请求方法：${method}, 请求响应状态码：${status}, 请求错误问题：${message}`;
				}
				throw new HttpException(message, status);
			}
		};

		return descriptor;
	};
}

import Joi from '@hapi/joi';
import { logger } from '../utils';

const schema = Joi.object({
	body: {
		numbers: Joi.array().items(Joi.number().strict().required()),
	},
}).unknown(true);

export const add = (request, response, next) => {
	logger.info(`validating request for endpoint ${request.url}`);
	const result = Joi.validate(request, schema);
	if (result.error) {
		logger.info(`validating failed for endpoint ${request.url} with error ${result.error}`);
		return response.status(400).json({
			code : 400,
			message : `Bad Request: ${result.error}`,
		});
	}
	logger.info(`validated request...`);
	next();
};

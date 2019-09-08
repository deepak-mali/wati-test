import Joi from '@hapi/joi';

const schema = Joi.object({
	body: {
		numbers: Joi.array().items(Joi.number().strict().required()),
	},
}).unknown(true);

export const add = (request, response, next) => {
	const result = Joi.validate(request, schema);
	if (result.error) {
		return response.status(400).json({
			code : 400,
			message : `Bad Request: ${result.error}`,
		});
	}

	next();
};

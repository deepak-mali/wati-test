import * as controller from './controller';
import * as validator from './validators';

export const routes = (app) => {
	app.post('/add', validator.add, (request, response) => {
		const sum = controller.add(request.body.numbers)
		return response.status(200).json({
			sum,
		});
	});
};

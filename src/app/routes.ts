import * as controller from './controller';
import * as validator from './validators';

/**
 * @description - API endpoints declarations.
 * @param app - express server.
 */
export const routes = (app) => {
	//Route for addition functionality.
	app.post('/add', validator.add, (request, response) => {
		const sum = controller.add(request.body.numbers)
		return response.status(200).json({
			sum,
		});
	});
};

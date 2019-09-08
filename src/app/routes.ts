import * as controller from './controller';
import * as validator from './validators';

export const routes = (app) => {
	app.post('/add', validator.add, controller.add);
};

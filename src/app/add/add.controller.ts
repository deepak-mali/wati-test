import Add from '../../model/add.model';
import { logger } from '../../utils';
/**
 * @description - Function to add numbers provided in an array.
 * @returns { number } - Return a number which can be integer or float.
 */

export default class AddController {
  async add(body: Record<string, number>): Promise<number> {
    // logger.info(body);
    logger.info(`starting addition... num1: ${body.num1}, num2: ${body.num2}`);
    const sum = body.num1 + body.num2;

    logger.info('storing addition details...');
    const add = new Add({
      num1: body.num1,
      num2: body.num2,
      sum,
    });

    await add.save();
    logger.info(`Finished addition...`);
    return sum;
  }
}

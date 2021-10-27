import { logger } from '../../utils';

/**
 * @description - Function to add numbers provided in an array.
 * @param { Array<number> } numbers - Array of numbers.
 * @returns { number } - Return a number which can be integer or float.
 */

export default class DiscoveryController {
  constructor(protected body: Record<string, number>) {}

  add(body: Record<string, number[]>): number {
    logger.info(`starting addition...`);
    let sum = 0;
    body.numbers &&
      body.numbers.map(num => {
        num = Number(num);
        sum += num;
      });
    logger.info(`Finished addition...`);
    return sum;
  }
}

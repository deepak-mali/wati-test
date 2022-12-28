import { expect } from 'chai';
import { describe, it } from 'mocha';

import AddController from '../app/add/add.controller';
import { logger } from '../utils';

// Test cases for addition logic.
// TODO: mock mongodb calls.
describe('Testing Add functionality...', () => {
  let addController: AddController;
  beforeEach(() => {
    addController = new AddController();
  });
  it('Testing with integer numbers...', async () => {
    try {
      const sum = await addController.add({ num1: 2, num2: 3 });
      logger.info(`sum ${sum}`);
      expect(sum).to.equal(5);
    } catch (error) {
      logger.error(`error in test case ${error}`);
    }
  });

  it('Testing with floating and integer numbers...', async () => {
    try {
      const sum = await addController.add({ num1: 0.2, num2: 3 });
      expect(sum).to.equal(3.2);
    } catch (error) {
      logger.error(`error in test case ${error}`);
    }
  });
});

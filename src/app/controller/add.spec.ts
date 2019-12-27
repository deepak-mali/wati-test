import { describe, it } from 'mocha';
import { expect } from 'chai';
import { add } from '../controller';

// Test cases for addition logic.
describe('Testing Add functionality...', () => {
  it('Testing with number array', () => {
    expect(add([2, 2])).to.equal(4);
  });

  it('Testing with floating and integer number array...', () => {
    expect(add([0.2, 2])).to.equal(2.2);
  });
})
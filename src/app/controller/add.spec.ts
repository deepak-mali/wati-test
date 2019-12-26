import { describe, it } from 'mocha';
import { assert } from 'chai';
import { add } from '../controller';

describe('Testing Add functionality...', () => {
  it('Test add function', () => {
    assert(add([2, 2]), 4);
  }) 
})
import { INPUTS_MOCKS } from '../__mocks__/sortHelpers.mocks';
import { parseMakeupJson } from '../sortHelpers';

describe('tests for sortHelpers', () => {
  const { expectedValue, input } = INPUTS_MOCKS.SIMPLE_OBJ;
  it('should parse basic object and sort it.', () => {
    const result = parseMakeupJson(input);

    expect(result).toBe(expectedValue);
  });

  it.only('should parse basic object with nested object and sort it.', () => {
    const { expectedValue, input } = INPUTS_MOCKS.NESTED_OBJ;

    const result = parseMakeupJson(input);

    expect(result).toBe(expectedValue);
  });
});

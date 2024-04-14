import { INPUTS_MOCKS } from '../__mocks__/sortHelpers.mocks';
import { parseAndSortJson } from '../sortHelpers';

describe('tests for sortHelpers', () => {
  const { expectedValue, input } = INPUTS_MOCKS.SIMPLE_OBJ;
  it('should parse basic object and sort it.', () => {
    const result = parseAndSortJson(input);

    expect(result).toBe(expectedValue);
  });

  it('should parse basic object with nested object and sort it.', () => {
    const { expectedValue, input } = INPUTS_MOCKS.SIMPLE_OBJ;

    const result = parseAndSortJson(input);

    expect(result).toBe(expectedValue);
  });
});

import { parseAndSortJson } from '../sortHelpers';

describe('tests for sortHelpers', () => {
  it('should parse basic object and sort it.', () => {
    const input = '{\n  B: \'B\',\n  A: \'A\',\n}';

    const result = parseAndSortJson(input);

    expect(result).toBe('{\nA: \'A\',\nB: \'B\',\n}');
  });
});
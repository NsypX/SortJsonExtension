import { parseAndSortJson } from '../sortHelpers';

describe('tests for sortHelpers', () => {
  it('should parse basic object and sort it.', () => {
    const input = '{\n  B: \'B\',\n  A: \'A\',\n}';

    const result = parseAndSortJson(input);

    expect(result).toBe('{\nA: \'A\',\nB: \'B\',\n}');
  });

  it('should parse basic object with nested object and sort it.', () => {
    const input = '{\n  B: \'B\',\n  A: { D: \'D\', C: \'C\' },\n}';

    const result = parseAndSortJson(input);

    expect(result).toBe('{\nA: { C: \'C\', D: \'D\' },\nB: \'B\',\n}');
  });
});
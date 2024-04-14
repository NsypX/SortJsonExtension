export const INPUTS_MOCKS = {
  SIMPLE_OBJ: { input: '{\n  B: \'B\',\n  A: \'A\',\n}', expectedValue: '{\nA: \'A\',\nB: \'B\',\n}' },
  NESTED_OBJ: {
    input: '{\n  B: \'B\',\n  A: { D: \'D\', C: \'C\' },\n}',
    expectedValue: '{\n  C: {\n    D: \'D\',\n    C: \'C\',\n  },\n  B: \'B\',\n  A: \'A\',\n}',
  },
};
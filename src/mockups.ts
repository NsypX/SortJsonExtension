import { ITestsParams } from './types';

export const INPUTS_MOCKS:Record<string,ITestsParams> = {
  SIMPLE_OBJ: { input: '{\n  B: \'B\',\n  A: \'A\',\n}', expectedValue: '{\nA: \'A\',\nB: \'B\',\n}' },
  NESTED_OBJ: {
    input: '{\n  B: \'B\',\n  A: { D: \'D\', C: \'C\' },\n}',
    expectedValue: '{\n  C: {\n    D: \'D\',\n    C: \'C\',\n  },\n  B: \'B\',\n  A: \'A\',\n}',
  },
};

export const testFunction = (testParams:ITestsParams, fn: (input: string) => string) => {
  const { input, expectedValue } = testParams;
  const result = fn(input);
  
  if (result !== expectedValue) {
    throw new Error(`Expected ${expectedValue} but got ${result}`);
  }
};
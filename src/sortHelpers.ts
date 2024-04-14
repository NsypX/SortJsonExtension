import { ECurrentParsedType, IStringType, type IParsedEntry } from './types';

const checkIfJsonReturnKeys = (input: string): string => {
  const trimmed = input.trim();

  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    const retVal = trimmed.slice(1, -1);
    return retVal;
  }

  throw new Error('Not a valid JSON');
};

export const parseAndSortJson = (input: string) => {
  const keysAndValues = checkIfJsonReturnKeys(input);

  const lines = keysAndValues.split(',\n').map((line) => line.replace(/[\n\t\s]/g, '').trim());

  const parsedEntries = lines
    .map((line) => {
      const [key, ...values] = line.split(':');
      if (values.length === 0) {
        return null;
      }

      const value = values.join(':');
      return { key, value };
    })
    .filter(Boolean) as IParsedEntry[];

  // sort by key
  const sortedEntries = parsedEntries.sort((a, b) => {
    if (a.key < b.key) {
      return -1;
    }
    if (a.key > b.key) {
      return 1;
    }
    return 0;
  });

  const retVal = `{\n${sortedEntries.map(({ key, value }) => `${key}: ${value},\n`).join('')}}`;

  return retVal;
};

export const decideType = (lines: string[], index: number): IStringType => {
  const currLine = lines[index];

  const isKeyValue = currLine.indexOf(':') === -1;

  const value = isKeyValue ? currLine.trim() : currLine.split(':')[1].trim();

  if (value.startsWith('{')) return { type: ECurrentParsedType.JSON, value:value.slice(1, -1) };

  if (value.startsWith('[')) return { type: ECurrentParsedType.ARRAY, value:value.slice(1, -1) };

  return { type:ECurrentParsedType.UNKNOWN,value };
};

export const parseMakeupJson = (input: string) => {
  const lines = input.split('\n');
};

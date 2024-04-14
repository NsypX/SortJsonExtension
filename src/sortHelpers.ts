import { IParsedEntry } from './types';

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

  const retVal = `{\n${sortedEntries.map(({ key, value }) => `${key}: ${value},\n`).join('')}\n}`;

  return retVal;
};
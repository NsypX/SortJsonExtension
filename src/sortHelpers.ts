import { ECurrentParsedType, IStringType, type IParsedEntry } from './types';

export const parseAndSortJson = (lines: string[]) => {
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

  const value = currLine.trim();

  const removeFirstChar = value.substring(1);
  
  if (value.startsWith('{')) return { type: ECurrentParsedType.JSON, value: removeFirstChar };

  if (value.startsWith('[')) return { type: ECurrentParsedType.ARRAY, value: removeFirstChar };

  return { type: ECurrentParsedType.UNKNOWN, value };
};

export const parseMakeupJson = (input: string) => {
  const lines = input.split(',\n').map((line) => line.replace(/[\n\t\s]/g, '').trim());

  const startAt = 0;
  const { type, value } = decideType(lines, startAt);
  lines[startAt] = value;

  switch (type) {
    case ECurrentParsedType.JSON: {
      return parseAndSortJson(lines);
    }
    case ECurrentParsedType.ARRAY: {
      return value;
    }
    case ECurrentParsedType.UNKNOWN: {
      return value;
    }
  }

};

import { ECurrentParsedType, IParseResult, IStringType, type IParsedEntry } from './types';

const wrapJsonObject = (entries: IParsedEntry[]) =>
  `{\n${entries.map(({ key, value }) => `${key}: ${value},\n`).join('')}}`;

const parseObjectLine = (line: string): IParsedEntry | null => {
  const [key, ...values] = line.split(':');
  if (values.length === 0) {
    return null;
  }

  const value = values.join(':').replace('}', '');

  return { key, value };
};

export const decideType = (lines: string[], index: number): IStringType => {
  const currLine = lines[index];

  const value = currLine.trim();

  const removeFirstChar = value.substring(1);

  if (value.startsWith('{')) return { type: ECurrentParsedType.JSON, value: removeFirstChar };

  if (value.startsWith('[')) return { type: ECurrentParsedType.ARRAY, value: removeFirstChar };

  return { type: ECurrentParsedType.UNKNOWN, value };
};

const parseParseType = (lines: string[], startAt: number = 0): string => {
  const { type, value } = decideType(lines, startAt);
  lines[startAt] = value;

  switch (type) {
    case ECurrentParsedType.JSON: {
      const { value } = parseAndSortJson(lines, startAt);

      return value;
    }
    case ECurrentParsedType.ARRAY: {
      return value;
    }
    case ECurrentParsedType.UNKNOWN: {
      return value;
    }
  }
};

const sortJsonEntries = (parsedEntries: IParsedEntry[]) => {
  return parsedEntries.sort((a, b) => {
    if (a.key < b.key) {
      return -1;
    }
    if (a.key > b.key) {
      return 1;
    }
    return 0;
  });
};

export const parseAndSortJson = (lines: string[], startAt: number): IParseResult => {
  let i = startAt;
  let isClosedObject = false;
  const parsedEntries: IParsedEntry[] = [];

  for (; i < lines.length; i++) {
    const currLine = lines[i];
    const currEntry = parseObjectLine(currLine);

    if (currEntry) {
      parsedEntries.push(currEntry);
    }

    if (currLine.endsWith('}')) {
      isClosedObject = true;
      break;
    }
  }

  if (!isClosedObject) throw new Error('Invalid JSON object');

  const sortedEntries = sortJsonEntries(parsedEntries);

  return {
    endAt: i,
    value: wrapJsonObject(sortedEntries),
  };
};

export const parseMakeupJson = (input: string) => {
  const lines = input.split(',\n').map((line) => line.replace(/[\n\t\s]/g, '').trim());

  return parseParseType(lines);
};

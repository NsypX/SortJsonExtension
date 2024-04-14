import { ECurrentParsedType, IParseResult, IStringType, type IParsedEntry } from './types';

const parseObjectLine = (line: string): IParsedEntry | null => {
  const [key, ...values] = line.split(':');
  if (values.length === 0) {
    return null;
  }

  const value = values.join(':').replace('}', '');

  return { key, value };
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

export const parseAndSortJson = (lines: string[]) => {
  const parsedEntries = lines
    .map((line) => parseObjectLine(line))
    .filter(Boolean) as IParsedEntry[];

  const sortedEntries = sortJsonEntries(parsedEntries);

  const retVal = `{\n${sortedEntries.map(({ key, value }) => `${key}: ${value},\n`).join('')}}`;

  return retVal;
};

export const parseJsonObject = (lines: string[], startAt: number): IParseResult => {
  let i = startAt;
  let isClosedObject = false;
  const parsedEntries: IParsedEntry[] = [];

  for (; i < lines.length; i++) {
    const currLine = lines[i];
    const res = parseObjectLine(currLine);

    if (res) {
      parsedEntries.push(res);
    }

    if (currLine.endsWith('}')) {
      isClosedObject = true;
      break;
    }
  }

  return {
    endAt: i,
    value: lines[startAt],
  };
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

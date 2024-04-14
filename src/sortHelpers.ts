import type { IParseResult, IStringType, IParsedEntry } from './types';

import { ECurrentParsedType } from './constants';
import { testFunction, INPUTS_MOCKS } from './mockups';

const wrapJsonObject = (entries: IParsedEntry[]) =>
  `{\n${entries.map(({ key, value }) => `${key}: ${value},\n`).join('')}}`;

const parseObjectLine = (line: string, overrideValue?: string): IParsedEntry | null => {
  const [key, ...values] = line.split(':');

  if (values.length === 0) {
    return null;
  }

  const value = values.join(':').replace('}', '');

  return { key, value: overrideValue || value };
};

export const decideType = (lines: string[], index: number): IStringType => {
  const currLine = lines[index];

  const value = currLine.trim();

  const removeFirstChar = value.substring(1);

  if (value.startsWith('{')) return { type: ECurrentParsedType.JSON, value: removeFirstChar };

  if (value.startsWith('[')) return { type: ECurrentParsedType.ARRAY, value: removeFirstChar };

  if (value.indexOf(':') !== -1) {
    const [_, ...values] = value.split(':');
    const keyValueValue = values.join(':').trim();

    const removeFirstCharKeyValueValue = keyValueValue.substring(1);

    if (keyValueValue.startsWith('{')) return { type: ECurrentParsedType.JSON, value: removeFirstCharKeyValueValue };

    if (keyValueValue.startsWith('[')) return { type: ECurrentParsedType.ARRAY, value: removeFirstCharKeyValueValue };
  }

  return { type: ECurrentParsedType.UNKNOWN, value };
};

const parseParseType = (lines: string[], startAt: number = 0): IParseResult => {
  const { type, value } = decideType(lines, startAt);
  lines[startAt] = value;

  switch (type) {
    case ECurrentParsedType.JSON: {
      return parseAndSortJson(lines, startAt);
    }
    case ECurrentParsedType.ARRAY: {
      return { value, endAt: startAt };
    }
    case ECurrentParsedType.UNKNOWN: {
      return { value, endAt: startAt };
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
    
    const { endAt, value } = parseParseType(lines, i);

    const currEntry = (i !== endAt) ? parseObjectLine(currLine,value) : parseObjectLine(currLine);

    i = endAt;

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

export const parseMakeupJson = (input: string): string => {
  const lines = input.split(',\n').map((line) => line.replace(/[\n\t\s]/g, '').trim());

  const { value } = parseParseType(lines);
  return value;
};

testFunction(INPUTS_MOCKS.NESTED_OBJ, parseMakeupJson);

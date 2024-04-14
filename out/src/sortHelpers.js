"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMakeupJson = exports.parseAndSortJson = exports.decideType = void 0;
const types_1 = require("./types");
const wrapJsonObject = (entries) => `{\n${entries.map(({ key, value }) => `${key}: ${value},\n`).join('')}}`;
const parseObjectLine = (line) => {
    const [key, ...values] = line.split(':');
    if (values.length === 0) {
        return null;
    }
    const value = values.join(':').replace('}', '');
    return { key, value };
};
const decideType = (lines, index) => {
    const currLine = lines[index];
    const value = currLine.trim();
    const removeFirstChar = value.substring(1);
    if (value.startsWith('{'))
        return { type: types_1.ECurrentParsedType.JSON, value: removeFirstChar };
    if (value.startsWith('['))
        return { type: types_1.ECurrentParsedType.ARRAY, value: removeFirstChar };
    return { type: types_1.ECurrentParsedType.UNKNOWN, value };
};
exports.decideType = decideType;
const parseParseType = (lines, startAt = 0) => {
    const { type, value } = (0, exports.decideType)(lines, startAt);
    lines[startAt] = value;
    switch (type) {
        case types_1.ECurrentParsedType.JSON: {
            const { value } = (0, exports.parseAndSortJson)(lines, startAt);
            return value;
        }
        case types_1.ECurrentParsedType.ARRAY: {
            return value;
        }
        case types_1.ECurrentParsedType.UNKNOWN: {
            return value;
        }
    }
};
const sortJsonEntries = (parsedEntries) => {
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
const parseAndSortJson = (lines, startAt) => {
    let i = startAt;
    let isClosedObject = false;
    const parsedEntries = [];
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
    if (!isClosedObject)
        throw new Error('Invalid JSON object');
    const sortedEntries = sortJsonEntries(parsedEntries);
    return {
        endAt: i,
        value: wrapJsonObject(sortedEntries),
    };
};
exports.parseAndSortJson = parseAndSortJson;
const parseMakeupJson = (input) => {
    const lines = input.split(',\n').map((line) => line.replace(/[\n\t\s]/g, '').trim());
    return parseParseType(lines);
};
exports.parseMakeupJson = parseMakeupJson;
//# sourceMappingURL=sortHelpers.js.map
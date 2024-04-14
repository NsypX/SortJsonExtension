import { ECurrentParsedType } from './constants';

export interface IParsedEntry {
    key:string;
    value:string;
}

export interface IStringType {
    type: ECurrentParsedType;
    value: string;
}

export interface IParseResult {
    endAt: number;
    value: string;
}

export interface ITestsParams {
    input: string;
    expectedValue: string;
}
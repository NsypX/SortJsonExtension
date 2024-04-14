export interface IParsedEntry {
    key:string;
    value:string;
}

export enum ECurrentParsedType {
    JSON = 'JSON',
    ARRAY = 'ARRAY',
    UNKNOWN = 'UNKNOWN'
}

export interface IStringType {
    type: ECurrentParsedType;
    value: string;
}

export interface IParseResult {
    endAt: number;
    value: string;
}
declare module 'str-utils' {

    type StringUtilityType = (value: string) => string;

    export const strReverse: StringUtilityType;
    export const strToLower: StringUtilityType;
    export const strToUpper: StringUtilityType;
    export const strRandomize: StringUtilityType;
    export const strInvertCase: StringUtilityType;
}


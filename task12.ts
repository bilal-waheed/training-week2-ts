declare module 'stats' {

    type Comp<T> = (a:T, b:T) => number;
    type GetIndex = <T>(input: T[], comparator: Comp<T>)=> number;
    type GetElement = <T>(input: T[], comparator: Comp<T>)=> null | T;

    export const getMaxIndex: GetIndex;
    export const getMinIndex: GetIndex;
    export const getMedianIndex: GetIndex;

    export const getMaxElement: GetElement;
    export const getMinElement: GetElement;
    export const getMedianElement: GetElement;

    export function getAverageValue<T>(input: T[], getValue: (a:T)=>number): number | null;
    
}

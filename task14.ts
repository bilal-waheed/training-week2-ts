/*

Intro:

    For some unknown reason most of our developers left
    the company. We need to actively hire now.
    In the media we've read that companies that invent
    and publish new technologies attract more potential
    candidates. We need to use this opportunity and
    invent and publish some npm packages. Following the
    new trend of functional programming in JS we
    decided to develop a functional utility library.
    This will put us on the bleading edge since we are
    pretty much sure no one else did anything similar.
    We also provided some jsdoc along with the
    functions, but it might sometimes be inaccurate.

Exercise:

    Provide proper typing for the specified functions.

Bonus:

    Could you please also refactor the code to reduce
    code duplication?
    You might need some excessive type casting to make
    it really short.

*/


interface SubMapFunc<T, U> {
    (): SubMapFunc<T, U>,
    (input: T[]): U[]
}

interface MapFunc {
    (): MapFunc,
    <T, U>(mapper: (arg: T) => U): SubMapFunc<T, U>,
    <T, U>(mapper: (arg: T) => U, input: T[]): U[],
}

/**
 * 2 arguments passed: returns a new array
 * which is a result of input being mapped using
 * the specified mapper.
 *
 * 1 argument passed: returns a function which accepts
 * an input and returns a new array which is a result
 * of input being mapped using original mapper.
 *
 * 0 arguments passed: return itself.
 *
 * @param {Function} mapper
 * @param {Array} input
 * @return {Array | Function}
 */
export let map = function<T, U>(mapper: (arg:T)=>U, input: T[]) {
    if (arguments.length === 0) {
        return map;
    }
    if (arguments.length === 1) {
        return function subFunction(subInput:T[]) {
            if (arguments.length === 0) {
                return subFunction;
            }
            return subInput.map(mapper);
        };
    }
    return input.map(mapper);
} as MapFunc


interface SubFilterFunc<T> {
    (): SubFilterFunc<T>,
    (input: T[]): T[]
}

interface FilterFunc {
    (): FilterFunc,
    <T, U>(filterer: (arg: T) => boolean): SubFilterFunc<T>,
    <T, U>(filterer: (arg: T) => boolean, input: T[]): T[],
}

/**
 * 2 arguments passed: returns a new array
 * which is a result of input being filtered using
 * the specified filter function.
 *
 * 1 argument passed: returns a function which accepts
 * an input and returns a new array which is a result
 * of input being filtered using original filter
 * function.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Function} filterer
 * @param {Array} input
 * @return {Array | Function}
 */
export let filter = function <T>(filterer: (arg:T)=>T[], input: T[]) {
    if (arguments.length === 0) {
        return filter;
    }
    if (arguments.length === 1) {
        return function subFunction(subInput: T[]) {
            if (arguments.length === 0) {
                return subFunction;
            }
            return subInput.filter(filterer);
        };
    }
    return input.filter(filterer);
} as FilterFunc;


interface SubSubReducerFunc<T, U> {
    (): SubSubReducerFunc<T, U>,
    (input: T[]): U
}

interface SubReducerFunc<T, U> {
    (): SubReducerFunc<T, U>,
    (initialValue: U): SubSubReducerFunc<T, U>,
    (initialValue: U, input: T[]): U
}

/**
 * 3 arguments passed: reduces input array it using the
 * specified reducer and initial value and returns
 * the result.
 *
 * 2 arguments passed: returns a function which accepts
 * input array and reduces it using previously specified
 * reducer and initial value and returns the result.
 *
 * 1 argument passed: returns a function which:
 *   * when 2 arguments is passed to the subfunction, it
 *     reduces the input array using specified initial
 *     value and previously specified reducer and returns
 *     the result.
 *   * when 1 argument is passed to the subfunction, it
 *     returns a function which expects the input array
 *     and reduces the specified input array using
 *     previously specified reducer and inital value.
 *   * when 0 argument is passed to the subfunction, it
 *     returns itself.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Function} reducer
 * @param {*} initialValue
 * @param {Array} input
 * @return {* | Function}
 */
interface ReduceFunc {
    (): ReduceFunc,
    <T, U>(reducer: (acc:U, val:T)=> U): SubReducerFunc<T, U>
    <T, U>(reducer: (acc:U, val:T)=> U, initialValue: U): SubSubReducerFunc<T, U>,
    <T, U>(reducer: (acc:U, val:T)=> U, initialValue: U, input: T[]): U
}

export let reduce = function<T, U>(reducer: (acc:U, val:T)=> U, initialValue: U, input: T[]) {
    if (arguments.length === 0) {
        return reduce;
    }
    if (arguments.length === 1) {
        return function subFunction(subInitialValue:U, subInput:T[]) {
            if (arguments.length === 0) {
                return subFunction;
            }
            if (arguments.length === 1) {
                return function subSubFunction(subSubInput:T[]) {
                    if (arguments.length === 0) {
                        return subSubFunction;
                    }
                    return subSubInput.reduce(reducer, subInitialValue);
                };
            }
            return subInput.reduce(reducer,subInitialValue);
        }
    }
    if (arguments.length === 2) {
        return function subFunction(subInput:T[]) {
            if (arguments.length === 0) {
                return subFunction;
            }
            return subInput.reduce(reducer, initialValue);
        };
    }
    return input.reduce(reducer, initialValue);
} as ReduceFunc


interface SubArithmetic {
    (): SubArithmetic,
    (b:number):number,
}

interface Arithmetic {
    (): Arithmetic;
    (a:number): SubArithmetic,
    (a:number, b:number): number,
}

/**
 * 2 arguments passed: returns sum of a and b.
 *
 * 1 argument passed: returns a function which expects
 * b and returns sum of a and b.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Number} a
 * @param {Number} b
 * @return {Number | Function}
 */
export let add = function(a:number,b:number){
    if (arguments.length === 0) {
        return add;
    }
    if (arguments.length === 1) {
        return function subFunction(subB:number){
            if (arguments.length === 0) {
                return subFunction;
            }
            return a + subB;
        };
    }
    return a + b;
} as Arithmetic;

/**
 * 2 arguments passed: subtracts b from a and
 * returns the result.
 *
 * 1 argument passed: returns a function which expects
 * b and subtracts b from a and returns the result.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Number} a
 * @param {Number} b
 * @return {Number | Function}
 */
export let subtract = function(a:number, b:number) {
    if (arguments.length === 0) {
        return subtract;
    }
    if (arguments.length === 1) {
        return function subFunction(subB:number) {
            if (arguments.length === 0) {
                return subFunction;
            }
            return a - subB;
        };
    }
    return a - b;
} as Arithmetic;


interface SubPropFunc<U extends string> {
    (): SubPropFunc<U>,
    <T extends {[key in U] : T[U]}>(obj: T): T[U]
}

interface PropFunc {
    (): PropFunc,
    <U extends string>(propName: U): SubPropFunc<U>,
    <T, U extends keyof T>(propName: U, obj: T): T[U]
}

/**
 * 2 arguments passed: returns value of property
 * propName of the specified object.
 *
 * 1 argument passed: returns a function which expects
 * propName and returns value of property propName
 * of the specified object.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Object} obj
 * @param {String} propName
 * @return {* | Function}
 */
export let prop = function<T extends Object, U extends keyof T>(obj: T, propName: U) {
    if (arguments.length === 0) {
        return prop;
    }
    if (arguments.length === 1) {
        return function subFunction(subPropName: U) {
            if (arguments.length === 0) {
                return subFunction;
            }
            return obj[subPropName];
        };
    }
    return obj[propName];
} as PropFunc;

/**
 * >0 arguments passed: expects each argument to be
 * a function. Returns a function which accepts the
 * same arguments as the first function. Passes these
 * arguments to the first function, the result of
 * the first function passes to the second function,
 * the result of the second function to the third
 * function... and so on. Returns the result of the
 * last function execution.
 *
 * 0 arguments passed: returns itself.
 *
 * TODO TypeScript
 *   * Should properly handle at least 5 arguments.
 *   * Should also make sure argument of the next
 *     function matches the return type of the previous
 *     function.
 *
 * @param {Function[]} functions
 * @return {*}
 */

type F<A extends unknown[], R> = (...args: A) => R;
type TR<I, O> = (arg: I) => O;

interface PipeFunc {
    (): PipeFunc,
    <A1 extends unknown[], R1>(f: F<A1, R1>): (...args: A1) => R1,
    <A1 extends unknown[], R1, R2>(f: F<A1, R1>, tr1: TR<R1, R2>): (...args: A1) => R2,
    <A1 extends unknown[], R1, R2, R3>(f: F<A1, R1>, tr1: TR<R1, R2>, tr2: TR<R2, R3>): (...args: A1) => R3,
    <A1 extends unknown[], R1, R2, R3, R4>(f: F<A1, R1>, tr1: TR<R1, R2>, tr2: TR<R2, R3>, tr3: TR<R3, R4>): (...args: A1) => R4,
    <A1 extends unknown[], R1, R2, R3, R4, R5>(f: F<A1, R1>, tr1: TR<R1, R2>, tr2: TR<R2, R3>, tr3: TR<R3, R4>, tr4: TR<R4, R5>): (...args: A1) => R5

}

export let pipe:PipeFunc = function(...functions: Function[]) {
    if (arguments.length === 0) {
        return pipe;
    }
    return function subFunction() {
        let nextArguments = Array.from(arguments);
        let result;
        for (const func of functions) {
            result = func(...nextArguments);
            nextArguments = [result];
        }
        return result;
    };
};

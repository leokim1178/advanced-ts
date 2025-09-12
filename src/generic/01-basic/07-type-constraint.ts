import {Equal, Expect} from "../../helper";

type GetParametersAndReturnType<T extends (...args: any) => any> = { // 스프레드 연산자로 뿌려주면 여러개 인자를 받거나 안받을수도 있다
    params: Parameters<T>;
    returnValue: ReturnType<T>;
};

type tests = [
    Expect<
        Equal<
            GetParametersAndReturnType<() => string>,
            { params: []; returnValue: string }
        >
    >,
    Expect<
        Equal<
            GetParametersAndReturnType<(s: string) => void>,
            { params: [string]; returnValue: void }
        >
    >,
    Expect<
        Equal<
            GetParametersAndReturnType<(n: number, b: boolean) => number>,
            { params: [number, boolean]; returnValue: number }
        >
    >,
];

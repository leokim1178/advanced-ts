import {Equal, Expect} from "../../helper";

type CreateDataShape<TData, TError = undefined> = { // 디폴트 파라미터 처럼 인자를 이렇게 지정할 수 있다
    data: TData;
    error: TError;
};

type tests = [
    Expect<
        Equal<
            CreateDataShape<string>,
            {
                data: string;
                error: undefined;
            }
        >
    >,
    Expect<
        Equal<
            CreateDataShape<boolean, SyntaxError>,
            {
                data: boolean;
                error: SyntaxError;
            }
        >
    >,
];

import {Equal, Expect} from "../../helper";


type CreateDataShape<T1, T2> = {
    data: T1;
    error: T2;
};
// arrow function 일때는 앞에
// 타입 선언 일때는 타입명 뒤에 인자를 배치한다

type tests = [
    Expect<
        Equal<
            CreateDataShape<string, TypeError>,
            {
                data: string;
                error: TypeError;
            }
        >
    >,
    Expect<
        Equal<
            CreateDataShape<number, Error>,
            {
                data: number;
                error: Error;
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

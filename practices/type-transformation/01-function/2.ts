import {Equal, Expect} from "../../helper";


function func(
    foo: string,
    obj: {
        bar: number;
        bas: boolean;
    }
): void {

}

type FuncParameters = Parameters<typeof func>; // Parameters를 사용하면 다른 함수의 파라미터를 추론하여 그대로 사용가능


// Array : 아래와 같이 길이가 동적이다
type StringArray = string[];
// Tuple : 아래와 같이 길이가 고정
type StringTuple = [string, string];

type tests = [
    Expect<
        Equal<
            FuncParameters,
            // tuple type 😅
            [
                string,
                {
                    bar: number;
                    bas: boolean;
                },
            ]
        >
    >,
];

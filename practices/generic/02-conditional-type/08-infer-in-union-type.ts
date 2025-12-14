import {Equal, Expect} from "../../helper";

const parser1 = {
    parse: () => 1,
};

const parser2 = () => "123";

const parser3 = {
    extract: () => true,
};


// type GetParserResult<T> = T extends () => infer T ? T : T extends {
//     [x: string]: () => infer R
// } ? R : never;
// // parser가 함수형인지 검증
// // - 함수형인경우 리턴타입 리턴
// // - 함수형이 아닌 객체 안의 함수인 경우 객체 안의 함수의 리턴타입을 리턴
// // - 둘 다 아닌 경우 never

// 추가 리펙
type GetParserResult<T> =
    T extends () => infer TResult ? TResult :
        T extends { parse: () => infer TResult } ? TResult :
            T extends { extract: () => infer TResult } ? TResult : never;
// parse와 extract를 규정이라고 생각한다면 위와 같이 리펙할수 있다

type tests = [
    Expect<Equal<GetParserResult<typeof parser1>, number>>,
    Expect<Equal<GetParserResult<typeof parser2>, string>>,
    Expect<Equal<GetParserResult<typeof parser3>, boolean>>,
];

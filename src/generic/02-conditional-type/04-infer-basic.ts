import {Equal, Expect} from "../../helper";

type GetDataValue<T> = T extends { data: infer T2 } ? T2 : never;
// infer 키워드
// extends 조건문 이후 사용가능
// ts가 자동으로 타입을 추론한다


type tests = [
    Expect<Equal<GetDataValue<{ data: "hello" }>, "hello">>,
    Expect<Equal<GetDataValue<{ data: { name: "hello" } }>, { name: "hello" }>>,
    Expect<
        Equal<
            GetDataValue<{ data: { name: "hello"; age: 20 } }>,
            { name: "hello"; age: 20 }
        >
    >,
    // Expect that if you pass in string, it
    // should return never
    Expect<Equal<GetDataValue<string>, never>>,
];

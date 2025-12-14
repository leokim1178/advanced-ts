import {Equal, Expect} from "../../helper";

type YouSayGoodbyeAndISayHello<T> = T extends "hello" | "goodbye" ?
    T extends "hello" ? "goodbye" : "hello"
    : never;
// 조건문 안의 조건문이 필요한 경우 위와 같이 한다

type tests = [
    Expect<Equal<YouSayGoodbyeAndISayHello<"hello">, "goodbye">>,
    Expect<Equal<YouSayGoodbyeAndISayHello<"goodbye">, "hello">>,
    Expect<Equal<YouSayGoodbyeAndISayHello<"alright pal">, never>>,
    Expect<Equal<YouSayGoodbyeAndISayHello<1>, never>>,
];

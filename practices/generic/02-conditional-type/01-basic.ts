import {Equal, Expect} from "../../helper";

type YouSayGoodbyeAndISayHello<T> = T extends "hello" ? "goodbye" : "hello";
// 타입스크립트 제너릭에서는 extends가 조건문 역할을 한다

type tests = [
    Expect<Equal<YouSayGoodbyeAndISayHello<"hello">, "goodbye">>,
    Expect<Equal<YouSayGoodbyeAndISayHello<"goodbye">, "hello">>,
];

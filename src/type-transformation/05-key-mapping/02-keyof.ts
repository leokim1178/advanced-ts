import {Equal, Expect} from "../../helper";

interface Attributes {
    firstName: string;
    lastName: string;
    age: number;
}

type Keys = keyof Attributes;
// 객체에 keyof를 붙이면 union 타입이 된다

type AttributeGetters = {
    [K in keyof Attributes]: () => Attributes[K];
    // object의 key로 접근해 리턴타입을 추론한다
}


type tests = [
    Expect<
        Equal<
            AttributeGetters,
            {
                firstName: () => string;
                lastName: () => string;
                age: () => number;
            }
        >
    >,
];

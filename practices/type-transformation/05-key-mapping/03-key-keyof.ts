import {Equal, Expect} from "../../helper";

interface Attributes {
    firstName: string;
    lastName: string;
    age: number;
}

type Keys = keyof Attributes;

type AttributeGetters = {
    // 키를 변형하는 방법은 as를 붙이는 것
    // Capitalize 라는 유틸리티로 대문자화 할 수 있다
    [K in Keys as `get${Capitalize<K>}`]: () => Attributes[K];
}

type tests = [
    Expect<
        Equal<
            AttributeGetters,
            {
                getFirstName: () => string;
                getLastName: () => string;
                getAge: () => number;
            }
        >
    >
];

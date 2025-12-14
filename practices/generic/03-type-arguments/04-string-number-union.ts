import {Equal, Expect} from "../../helper";

export const inferItemLiteral = <T extends string | number
    // 이렇게 타입제한을 걸어버리면 output의 타입이 "a",123과 같이 제한적이 된다
    // 제네릭에 기본 타입으로 제한을 두면, 타입스크립트 컴파일러는 해당 제네릭 사용 시 주어진 값의 타입을 `string`이나 `number` 대신 'abc', 123과 같은 더 구체적인 리터럴 타입으로 추론하려 한다.
    // 따라서 제한적인 상황의 경우 유용하지만
    // 동적인 경우에는 위 내용을 인지해야한다
>(t: T) => {
    return {
        output: t,
    };
};

const result1 = inferItemLiteral("a");
const result2 = inferItemLiteral(123);

type tests = [
    Expect<Equal<typeof result1, { output: "a" }>>,
    Expect<Equal<typeof result2, { output: 123 }>>
];

// @ts-expect-error
const error1 = inferItemLiteral({
    a: 1,
});

// @ts-expect-error
const error2 = inferItemLiteral([1, 2]);

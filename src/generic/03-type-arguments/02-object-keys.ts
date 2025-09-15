import {expect, it} from "vitest";
import {Equal, Expect} from "../../helper";

const typedObjectKeys = <TKey extends string
// Record의 키값은 string,number, symbol중 하나여야 하기 때문에 TKey의 타입을 extends로 좁혀준다
>(obj: Record<TKey, any>) => {
    // `Object.keys`의 기본 결과는 `string[]`이다
    // 그러나 제네릭 타입으로 객체 타입을 받아와 `as` 키워드로 추론된 키 타입을 강제하면
    // 입력 객체의 문자열 리터럴 유니온 타입 배열을 얻을 수 있다
    return Object.keys(obj) as TKey[]; // 혹은 as Array<TKey>
};

it("Should return the keys of the object", () => {
    const result1 = typedObjectKeys({
        a: 1,
        b: 2,
    });

    expect(result1).toEqual(["a", "b"]);

    type test = Expect<Equal<typeof result1, Array<"a" | "b">>>;
});

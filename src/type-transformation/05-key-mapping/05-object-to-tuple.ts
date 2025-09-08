import {Equal, Expect} from "../../../helper";

interface Values {
    email: string;
    firstName: string;
    lastName: string;
}

type ValuesAsUnionOfTuplesObject = {
    [K in keyof Values]: [K, Values[K]]
} // 이렇게만 한다면 {"email": ["email",string]}과 같은 형식이다
// 답과 같이 변경하려면 키값에 해당하는 값을 리턴해주는 타입을 사용해야 할 것이다
// 따라서 아래와 같이 하면 답이된다
type ValuesAsUnionOfTuples = ValuesAsUnionOfTuplesObject[keyof Values]
type tests = [
    Expect<
        Equal<
            ValuesAsUnionOfTuples,
            ["email", string] | ["firstName", string] | ["lastName", string]
        >
    >
];

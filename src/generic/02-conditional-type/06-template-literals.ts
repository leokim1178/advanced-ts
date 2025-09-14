import {Equal, Expect} from "../../helper";

type Names = [
    "Junsuk Park",
    "Bill Evans",
    "Stan Getz",
];


type GetSurname<T> = T extends `${infer FirstName} ${infer LastName}` ? LastName : never;
// infer는 타입을 추론함과 동시에 제너릭 타입 내에서 변수로 선언한다
// 작동원리는 공부를 따로 해야할듯

type tests = [
    Expect<Equal<GetSurname<Names[0]>, "Park">>,
    Expect<Equal<GetSurname<Names[1]>, "Evans">>,
    Expect<Equal<GetSurname<Names[2]>, "Getz">>,
];

import {Equal, Expect} from "../../helper";

interface Example {
    name: string;
    age: number;
    id: string;
    organisationId: string;
    groupId: string;
}

type OnlyIdKeys<T> = {
    [K in keyof T as K extends `${string}${"id" | "Id"}` ? K : never]: T[K]
}
// never를 사용할시 배제가 된다

type tests = [
    Expect<
        Equal<
            OnlyIdKeys<Example>,
            {
                id: string;
                organisationId: string;
                groupId: string;
            }
        >
    >,
    Expect<Equal<OnlyIdKeys<{}>, {}>>
];

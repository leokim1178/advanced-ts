import {expect, it} from "vitest";
import {Equal, Expect} from "../../helper";

const array = [
    {
        name: "Park",
    },
    {
        name: "Kim",
    },
];
type Accum = Record<string, {
    name: string,
}>

const obj = array.reduce((accum: Accum, item) => {
    accum[item.name] = item;
    return accum;
}, {} as Accum);

it("Should resolve to an object where name is the key", () => {
    expect(obj).toEqual({
        Park: {
            name: "Park",
        },
        Kim: {
            name: "Kim",
        },
    });

    type tests = [Expect<Equal<typeof obj, Record<string, { name: string }>>>];
});

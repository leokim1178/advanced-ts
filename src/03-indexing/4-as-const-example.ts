import {Equal, Expect} from "../../helper";

export const Color = {
    Red: "red",
    Green: "green",
    Blue: "blue",
} as const;

type ColorEnum = typeof Color;
type ColorType = keyof typeof Color

type RedAndBlue = typeof Color["Red" | "Blue"]
// Color["Red"|"Blue"] 로 유니온 타입을 만든 후 타이핑

type tests = [
    Expect<Equal<RedAndBlue, "red" | "blue">>
];

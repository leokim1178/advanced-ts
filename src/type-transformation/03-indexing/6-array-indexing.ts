import {Equal, Expect} from "../../../helper";

const rgb = ["red", "green", "blue"] as const;
// string array -> union 타입으로 추론되도록 변경

type RedAndBlue = typeof rgb[0 | 1];
type RGB = typeof rgb[number]

type tests = [
    Expect<Equal<RedAndBlue, "red" | "green">>,
    Expect<Equal<RGB, "red" | "green" | "blue">>,
];

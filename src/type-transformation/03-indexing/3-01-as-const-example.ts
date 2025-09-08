import {Equal, Expect} from "../../../helper";

export const Color = {
    Red: "red",
    Green: "green",
    Blue: "blue",
} as const; // as const를 붙이게 되면 enum과 같은 역할을 하게 된다

enum ColorEnum {
    Red,
    Green,
    Blue
}

type Red = typeof Color['Red']
type Green = typeof Color['Green'];
type Blue = typeof Color['Blue'];

type tests = [
    Expect<Equal<Red, "red">>,
    Expect<Equal<Green, "green">>,
    Expect<Equal<Blue, "blue">>,
];

import {Equal, Expect} from "../../helper";

export type Event =
    | {
    type: "click";
    event: MouseEvent;
}
    | {
    type: "focus";
    event: FocusEvent;
}
    | {
    type: "keydown";
    event: KeyboardEvent;
};

type NonKeyDownEvents = Exclude<Event, { type: "keydown" }>;
// Exclude 유틸리티를 활용하여 다음과 같이 특정 구성요소를 제외한 타입을 만들수 있다

type tests = [
    Expect<
        Equal<
            NonKeyDownEvents,
            | { type: "click"; event: MouseEvent }
            | { type: "focus"; event: FocusEvent }
        >
    >,
];

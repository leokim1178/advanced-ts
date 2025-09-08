import {Equal, Expect} from "../../../helper";

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

type ClickEvent = Extract<Event, { type: "click" }>
// Extract 유틸리티를 활용하여 다음과 같이 구성요소를 뽑아올수 있다

type tests = [Expect<Equal<ClickEvent, { type: "click"; event: MouseEvent }>>];

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

type EventType = Event["type"]; // 구분자를 모은 이벤트 타입으로 설정가능
type EventValue = Event["event"]

type tests = [Expect<Equal<EventType, "click" | "focus" | "keydown">>];

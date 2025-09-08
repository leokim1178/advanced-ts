import {Equal, Expect} from "../../../helper";

type Event = `log_in` | "log_out" | "sign_up";

type ObjectOfKeys = Record<Uppercase<Event>, string>;
// UpperCase 라는 유틸리티 타입

type tests = [
    Expect<
        Equal<
            ObjectOfKeys,
            {
                LOG_IN: string;
                LOG_OUT: string;
                SIGN_UP: string;
            }
        >
    >,
];

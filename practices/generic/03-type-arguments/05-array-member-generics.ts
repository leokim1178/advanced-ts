import {Equal, Expect} from "../../helper";


// 단순히 string[]이 아닌 네가지의 상태로 제한해야하는 상황
const makeStatusEvil = <TStatuses extends string[]>(statuses: TStatuses) => {
    return statuses;
};
// 위와 같은 경우 string[]이 되어버려서 결국 status를 제한할 수 없게 될 것이다

const makeStatus = <TStatus extends string>(status: TStatus[]) => {
    return status;
}
// 위와 같이 타입을 복수형으로 지정할경우 리턴타입도 명확하게 제한이 가능하다

const statuses = makeStatus(["INFO", "DEBUG", "ERROR", "WARNING"]);

type tests = [
    Expect<Equal<typeof statuses, Array<"INFO" | "DEBUG" | "ERROR" | "WARNING">>>,
];

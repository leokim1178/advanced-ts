import {Equal, Expect} from "../../../helper";

const returnWhatIPassIn = <T>(t: T) => {
    return t
}

const one = returnWhatIPassIn(1);
// 이때 타입은 number 로 추론되지 않고 1로 추론된다
const matt = returnWhatIPassIn("matt");
// 이때 타입은 string 으로 추론되지 않고 "matt"로 추론된다

type tests = [Expect<Equal<typeof one, 1>>, Expect<Equal<typeof matt, "matt">>];

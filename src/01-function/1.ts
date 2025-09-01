import {Equal, Expect} from "../helper";


const myFunc=()=>{
    return"hello";
}

type MyFuncReturn=ReturnType<typeof myFunc>; // 파라미터는 typeof로 추론


type tests = [Expect<Equal<MyFuncReturn, string>>];



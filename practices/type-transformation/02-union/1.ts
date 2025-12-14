type A =
    | {
    type: "a";
    a: string;
}
    | {
    type: "b";
    b: string;
}
    | {
    type: "c";
    c: string;
    d: string;
}; // discriminated Union

type B = "a" | "b" | "c"; // general Union

enum C {
    a = 'a',
    b = 'b',
    c = 'c'
} // enum
// 구성 요소는 타입이 일정해야한다

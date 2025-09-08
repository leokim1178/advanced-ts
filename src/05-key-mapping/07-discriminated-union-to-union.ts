import {Equal, Expect} from "../../helper";

type Fruit =
    | {
    name: "apple";
    color: "red";
}
    | {
    name: "banana";
    color: "yellow";
}
    | {
    name: "orange";
    color: "orange";
}; // object union

// 1차
// type TransformedFruit = {
//     [K in Fruit]: `${K["name"]}:${K["color"]}`
// }
// K에 올 수 있는 타입은 string | number | symbol이다.
// Fruit 자체는 object 타입이므로 위와 같이 표현할수 없다

// 2차
// 따라서 Mapped Types의 루프 상에서 만들어지는 최종 키값을 아래와 같이 string 타입으로 설정해주면 된다
type TransformedFruit = {
    [K in Fruit as K["name"]]: `${K["name"]}:${K["color"]}`
}[Fruit["name"]]

type tests = [
    Expect<
        Equal<TransformedFruit, "apple:red" | "banana:yellow" | "orange:orange">
    >,
];

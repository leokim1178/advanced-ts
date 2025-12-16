// type narrowing 예제
type Member = {
  id: string;
  name: string;
  addr: string;
  discountRate: number;
};
type Guest = {
  id: number;
  name: string;
  age: number;
};
let member: Member;
let guest: Guest;

let x: Member | Guest = {
  id: 123,
  name: "Charlie",
  age: 40,
  addr: "789 Oak St",
  discountRate: 0.2,
};

if (typeof x.id === "string") {
  member = x; // id 검증만으로는 부족하다는 에러
}
if (typeof x.id === "number") {
  guest = x; // id 검증만으로는 부족하다는 에러
}

if (typeof x.id === "string" && "discountRate" in x) {
  member = x; // OK 그런데 addr속성 검사관련 에러는 알려주지 않는다
}
if (typeof x.id === "string" && "addr" in x) {
  member = x; // OK 그런데 discountRate속성 검사관련 에러는 알려주지 않는다
}

if (typeof x.id === "number" && "age" in x) {
  guest = x; // OK
}

let y: Member | Guest = {
  id: 123,
  name: "Alice",
  age: 25,
  addr: "123 Main St",
  discountRate: 0.1,
};

if ("discountRate" in y && "addr" in y) {
  member = y; // OK
}
if ("age" in y) {
  guest = y; // OK
}

let z = {
  id: 123,
  name: "Bob",
  addr: "456 Elm St",
  age: 30,
  //   discountRate: 0.15,
};
guest = z; // z의 심볼테이블이 Guest타입보다 넓기 때문에 이미 z는 Guest타입을 충족시키고 있다
// 따라서 guest에는 할당 가능
member = z; // z의 타입은 discountRate가 없기 떄문에 Member타입을 충족시키지 못한다
// 따라서 member에는 할당 불가능

if ("age" in z) guest = z; // OK
if ("addr" in z) member = z; // NOT OK : discountRate 속성이 없기 때문

let h = Math.random() > 0.5 && "hello";
if (h) h.toUpperCase(); // h는 string 타입으로 좁혀짐
else console.log("h is falsy");

let a: string;
a = undefined; // strictNullChecks가 false이면 에러 없이 가능하다(권장하지 않음)
// 런타임

let b: string | undefined; // undefined될수있는 것들은 이렇게 항상 명시해야한다
b = Math.random() > 0.5 ? "hello" : undefined;
b?.slice(1);

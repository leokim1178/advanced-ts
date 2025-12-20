let values = []; // any[]

values.push(1); // number[]
values.push("string"); // (string | number)[]

const oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(oneToTen[4].toFixed(2));
//  "noUncheckedIndexedAccess": true 일 경우 컴파일 에러 발생
console.log(oneToTen[4]?.toFixed(2)); // ? 처리로 컴파일 에러 해결할수는 있다

interface SomeInterface {
  [key: string]: number;
}
let is: SomeInterface = {
  one: 1,
  two: 2,
  three: "three", // 컴파일 에러 발생
};

is["one"].toFixed(2); // 오류
is["one"]?.toFixed(2); // ? 처리로 컴파일 에러 해결할수는 있다
is["four"]?.toFixed(2); // 그러나 undefined 일수도 있다는점

// 튜플

let leo = ["leo", 30];
// leo 라는 array는 튜플 같이 보이지만 사실은 string | number 타입의 배열이다
// leo.push("developer"); // 또한 leo의 값은 이 라인에서 언제든지 변경될수 있다
let tuple: [string, number] = leo; // 따라서 leo는 [string, number] 타입에 할당될수 없다

const jane: [string, number, boolean] = ["jane", 28, true];
let jane2: [string, number, boolean] = jane;
// 이렇게 선언할때부터 튜플로 선언하면 타입이 맞기 때문에 할당이 가능하다

const greeting = (greet: "Hi" | "Hello", name: string, age: number) => {
  console.log(`${greet}, I'm ${name}. I'm ${age} years old.`);
};

const tenji: [string, number] = ["Tenji", 16];
const power = ["Power", 42];
greeting("Hello", ...tenji); // 스프레드 연산자로 튜플을 전달할수 있다
greeting("Hi", ...power); // power는 튜플이 아닌 (string | number)[] 타입이기 때문에 컴파일 에러 발생

const hiTenji: [string, string, number] = [
  "Hi", // greet
  "Tenji", // name
  16, // age
];
greeting(...hiTenji);

const name: string = "leo";
console.log(`🚀 name : ${name}`);
console.log("Hello, TypeScript!");
const myAge: number = 12;

// node src/hello.ts -> 에러 발생
// ts-node src/hello.ts -> 정상 실행
// ts-node는 ts파일을 메모리에서만 만들고 바로 실행
// tsc : 이 디렉토리 내에 있는 모든 ts파일을 js파일로 변환

let x;
x = 1; // 할당
console.log(`🚀 x : ${x}`); // number
x = "abc";
console.log(`🚀 x : ${x}`); // string

let y: string;
y = "hello";
// y = 10; // 에러 발생

let z: string | number;
z = "hello";
z = 10; // ok

let u: number;
// 이렇게 했을 때 사실상 js에서는 u가 undefined 상태이다
// 그러나 ts에서는 undefined 상태를 허용하지 않는다
// console.log(`🚀 u : ${u}`); // 미할당되었다는 에러발생

// let v: number = undefined; // 이렇게 초기화 단계에서 undefined를 줘도 허용하지않는다
let v: number | undefined = undefined; // 따라서 굳이 쓰려면 이렇게 해야한다
console.log(`🚀 v : ${v}`); // undefined

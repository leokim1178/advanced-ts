async function getData(): Promise<{ id: number; name: string }> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
  return await res.json();
}

(async () => {
  const x = await getData();
  // x가 어떤 타입인지 알려면 getData 함수의 반환 타입을 명시할수 있다
  console.log(x.id, x.name);
})();

type operation = (x: number, y: number) => number;

const multiply: operation = (x, y) => x * y;
const divide: operation = (x, y) => x / y;
// 타입 별칭은 특히 함수타입에 유용하다

console.log(multiply(10, 2));
console.log(divide(10, 2));

// 1번 : void를 반환하는 함수타입
let voidReturn: (something: string) => void;
// 1번의 경우 void이기 때문에 아래의 if문을 거치지 못하고 에러가 난다
// 2번 : undefined를 명시적으로 반환하는 함수타입
// let voidReturn: (something: string) => undefined;
// 2번의 경우 undefined라 할지라도 값이 있기 때문에 아래의 if문을 거칠수 있다
voidReturn = (something: string) => {
  console.log(something);
  return;
};
voidReturn("Hello");
if (voidReturn("Hello")) {
  // void일 경우 값을 사용할수 없다
  // 따라서 void는 undefined와는 다르다
  console.log("This will not be printed because voidReturn returns void.");
}

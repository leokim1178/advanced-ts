function add(a, b) {
  return a + b;
}
// 명시적으로 타입정보가 선언되지 않으면 절대 타입을 알수 없다

// -->
// 함수의 매개변수와 반환값에 타입을 선언
function addTyped(a: number, b: number): number {
  return a + b;
}

addTyped(1);
addTyped(1, 2, 3);
// 매개변수의 수가 맞지 않을 경우 오류 발생
addTyped(1, 2);

const restParamFunc = (a: number, ...rest: number[]) => {
  return a + rest.reduce((acc, cur) => acc + cur, 0);
};
const restParamFunc2 = (a: number, ...rest: [number, number]) => {
  return a + rest.reduce((acc, cur) => acc + cur, 0);
};

restParamFunc(1, 2, 3, 4); // OK
restParamFunc2(10, 20, 30); // OK
restParamFunc2(10, 20); // 오류: rest 매개변수의 길이가 맞지 않음
restParamFunc2(10, 20, 30, 40); // 오류: rest 매개변수의 길이가 맞지 않음
// 원래 rest 매개변수는 개수 제한이 없지만 튜플로 정의하면 개수를 제한할 수 있다.

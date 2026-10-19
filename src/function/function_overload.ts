function func(a: number): void;
function func(a: number, b: number, c: number): void;

// 실제 구현부 -> `구현 시그니처`
// 이렇게 구현부에서는 조건문을 통해 두가지 경우 모두 작성해야한다
// 조심해야 하는 부분은 이렇게 오버로딩을 할 경우 가까이 두어야 한다
function func(a: number, b?: number, c?: number) {
  if (typeof b === "number" && typeof c === "number") {
    console.log(a + b + c);
  } else {
    console.log(a * 20);
  }
}

func(1);
func(1, 2, 3);

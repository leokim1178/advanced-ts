- 타입스크립트는 재귀함수의 반환 타입을 통해 타입을 유추하는 것을 거부한다

  - 순환 참조의 위험이 있어 명시적으로 반환 타입을 지정해야 함

  ```ts
  // ❌ 타입 추론 실패 가능
  function factorial(n: number) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  }

  // ✅ 명시적 타입 지정
  function factorial(n: number): number {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  }
  ```

- as로 캐스팅 하는것은 any처럼 최후의 보루이다
  - 타입 단언(Type Assertion)은 타입 안정성을 해칠 수 있음
  - 가능한 타입 가드나 타입 좁히기를 사용하는 것이 좋음
- `y as Z`로 캐스팅을 했을때 타입이 안맞을경우
  - 완전히 다른 타입으로는 직접 캐스팅 불가
  - `y as unknown as Z` 처럼 이중 캐스팅 필요 (더욱 위험)

```ts
1. function f() {} // 함수 선언문 (Function Declaration)
2. const f = function () {}; // 함수 표현식 (Function Expression)
```

위 두가지의 차이는 뭘까?

- 첫번째는 **함수 선언문**
  - 메모리 creation phase에서 함수 객체가 생성된다
  - **호이스팅(hoisting)이 발생**하여 선언 전에 호출 가능
- 두번째는 **함수 표현식**
  - execution phase에서 함수 객체가 생성된다
  - **호이스팅이 발생하지 않음** (변수만 호이스팅, 할당은 X)

뭐가 좋을지는 상황에 따라 다르다

#### React에서의 차이점

- **함수 선언문**의 경우:
  - 호이스팅으로 인해 선언 전에도 사용 가능
  - 하지만 렌더링 여부와는 직접적인 관련이 없음
- **함수 표현식 (const 사용)**의 경우:
  - 선언 순서가 명확하여 코드 가독성이 좋음
  - const를 사용하면 재할당 방지로 안정성 증가
  - 화살표 함수 사용 시 this 바인딩 이슈 없음

**주의**: React 컴포넌트가 여러 번 렌더링되는 것은 함수 선언 방식보다는 상태 변경, props 변경, 부모 컴포넌트 렌더링 등이 원인이다

콜백함수에는 타입 지정을 안해도 된다
이미 타입스크립트가 유추를 해줌

### void 리턴 타입

- void 리턴 타입은 함수가 아무것도 반환하지 않는다는 것을 나타낸다
- void 이외의 타입을 반환하면 타입 오류가 발생한다

```ts
function logMessage(message: string): void {
  console.log(message);
  return; // OK
}
function logMessageWithReturn(message: string): void {
  console.log(message);
  return undefined; // OK
}
function logMessageWithValue(message: string): void {
  console.log(message);
  return 42; // 오류: 'number' 형식은 'void' 형식
  // 에 할당할 수 없습니다.
}
```

#### void 타입의 특수한 동작

**일반 함수에서의 void:**

```ts
function logMessage(message: string): void {
  return 42; // ❌ 오류: 'number' 형식은 'void' 형식에 할당할 수 없습니다.
}
```

**그러나 화살표 함수 표현식에서는:**

```ts
const func = (): void => 42; // ✅ 오류 없음 (TypeScript의 특수 규칙)
```

이것은 TypeScript의 의도된 동작입니다:

- 화살표 함수의 암시적 반환은 void 타입과 호환됨
- 하지만 실제로 반환된 값은 **무시되어야 함**
- `func().toString()` 같은 코드는 타입 오류가 발생함 (void는 메서드가 없음)

**콜백 함수에서의 void:**

```ts
// forEach의 콜백은 void를 반환한다고 정의됨
[1, 2, 3].forEach((num) => {
  return num * 2; // ✅ 오류 없음 - 반환값이 무시됨
});

// 이것도 가능
const numbers = [1, 2, 3].map((n) => n * 2);
numbers.forEach((n) => n); // void 콜백이지만 값 반환 가능
```

**핵심**: void 타입은 "반환값을 사용하지 마세요"라는 의미이지, "반환하지 마세요"가 아닙니다.
단, 함수 구현 시그니처에서 명시적으로 void를 선언하면 값을 반환할 수 없습니다.

### never 리턴 타입

- 의도적으로 항상 오류를 발생시키거나 무한 루프에 빠지는 함수에 사용된다
- return까지 도달하지 못하면 never 타입이 된다

```ts
function throwError(message: string): never {
  throw new Error(message);
}
```

- 함수가 정상적으로 종료되지 않는다는 것을 나타낸다
- void는 아무것도 반환하지 않는 함수를 위한것
- never는 결코 반환하지 않는, 끝나지 않는 함수를 위한 것

### 함수 오버로딩 (Function Overloading)

- JavaScript에서는 함수 오버로딩이 없다
- TypeScript에서는 함수 오버로딩을 지원한다

#### 기본 개념

함수 오버로딩은 **같은 이름의 함수**를 **다른 매개변수**로 여러 번 선언하는 것입니다.

```ts
// 오버로드 시그니처 (Overload Signatures)
function func(a: number): void;
function func(a: number, b: number, c: number): void;

// 구현 시그니처 (Implementation Signature)
function func(a: number, b?: number, c?: number) {
  if (typeof b === "number" && typeof c === "number") {
    console.log(a + b + c);
  } else {
    console.log(a * 20);
  }
}

func(1); // ✅ 첫 번째 오버로드 매칭
func(1, 2, 3); // ✅ 두 번째 오버로드 매칭
func(1, 2); // ❌ 오류: 어떤 오버로드와도 매칭 안됨
```

#### 주의사항

1. **오버로드 시그니처는 구현 시그니처와 호환되어야 함**
   - 구현 시그니처는 모든 오버로드를 처리할 수 있어야 함
2. **오버로드 시그니처를 가까이 두기**

   - 오버로드와 구현부는 연속되어 있어야 함
   - 중간에 다른 코드가 있으면 안됨

3. **더 구체적인 오버로드를 먼저 작성**
   ```ts
   function process(value: string): string;
   function process(value: number): number;
   function process(value: string | number): string | number {
     if (typeof value === "string") {
       return value.toUpperCase();
     }
     return value * 2;
   }
   ```

#### 실용적인 예제

```ts
// 배열 또는 단일 값을 받는 함수
function makeArray(value: number): number[];
function makeArray(value: number[]): number[];
function makeArray(value: number | number[]): number[] {
  return Array.isArray(value) ? value : [value];
}

const arr1 = makeArray(5); // number[]
const arr2 = makeArray([1, 2, 3]); // number[]
```

#### 언제 사용할까?

- 매개변수 개수가 다른 경우
- 매개변수 타입에 따라 반환 타입이 달라지는 경우
- 더 정확한 타입 추론이 필요한 경우

#### 대안: Union 타입

간단한 경우에는 union 타입이나 옵셔널 매개변수가 더 나을 수 있습니다:

```ts
// 오버로딩 대신
function greet(name?: string) {
  return name ? `Hello, ${name}` : "Hello";
}
```

---

### 추가 개념: 함수 타입 호환성

#### 매개변수 개수와 호환성

TypeScript는 함수 타입 할당 시 **매개변수가 적은 함수를 많은 매개변수를 받는 타입에 할당 가능**:

```ts
type Callback = (value: number, index: number, array: number[]) => void;

// ✅ 가능 - 사용하지 않는 매개변수 생략 가능
const callback: Callback = (value) => {
  console.log(value);
};

[1, 2, 3].forEach(callback); // 정상 동작
```

이는 JavaScript의 동작과 일치합니다 (사용하지 않는 인자 무시).

#### strictFunctionTypes

`tsconfig.json`의 `strictFunctionTypes` 옵션:

- 함수 매개변수의 공변성/반공변성을 엄격하게 검사
- 기본값: `strict` 모드에서 활성화

```ts
interface Animal {
  name: string;
}
interface Dog extends Animal {
  breed: string;
}

// strictFunctionTypes: true
let f1: (animal: Animal) => void;
let f2: (dog: Dog) => void;

f1 = f2; // ❌ 오류 - Dog는 Animal보다 구체적
f2 = f1; // ✅ 가능 - 반공변성
```

### 추가 개념: 제네릭 함수

함수에 제네릭을 사용하면 **타입 안정성을 유지**하면서 **재사용성**을 높일 수 있습니다:

```ts
// 기본 제네릭
function identity<T>(value: T): T {
  return value;
}

const num = identity(42); // T는 number로 추론
const str = identity("hello"); // T는 string으로 추론

// 제네릭 제약
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "Alice", age: 30 };
const name = getProperty(person, "name"); // string
const age = getProperty(person, "age"); // number
// getProperty(person, "invalid"); // ❌ 오류
```

### 추가 개념: this 타입

TypeScript에서 함수의 `this` 타입을 명시적으로 지정할 수 있습니다:

```ts
interface User {
  name: string;
  greet(this: User): void;
}

const user: User = {
  name: "Alice",
  greet() {
    console.log(`Hello, ${this.name}`);
  },
};

user.greet(); // ✅ 정상
const greetFn = user.greet;
// greetFn(); // ❌ 오류: this의 타입이 void

// bind로 this 고정
const boundGreet = user.greet.bind(user);
boundGreet(); // ✅ 정상
```

### 추가 개념: 함수 시그니처 vs 메서드 시그니처

```ts
interface Example {
  // 메서드 시그니처
  method1(): void;

  // 함수 프로퍼티 시그니처
  method2: () => void;
}
```

차이점:

1. **메서드 시그니처**는 오버라이딩 가능
2. **함수 프로퍼티**는 strictFunctionTypes 검사 대상
3. 메서드는 this 바인딩이 더 자연스러움

### 정리

1. **함수 선언문 vs 표현식**: 호이스팅 여부가 주요 차이
2. **void vs undefined**: void는 "값을 사용하지 마세요", undefined는 실제 값
3. **never**: 절대 반환하지 않는 함수 (throw, 무한 루프)
4. **함수 오버로딩**: 같은 이름, 다른 시그니처로 타입 안정성 향상
5. **제네릭**: 타입 재사용성과 안정성을 동시에
6. **타입 단언(as)**: 최후의 수단으로만 사용

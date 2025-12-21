### type alias vs interface

- type alias가 interface의 기능을 대부분 커버한다
- 때문에 요즘에는 interface보다는 type alias를 더 많이 사용하는 추세이다
- 다만 레거시는 interface를 많이 사용하고, interface가 필요한때도 있기 때문에 알아둘 필요가 있다
- 그럼 차이에 대해 알아보자

#### 병합(Declaration Merging)

- interface는 같은 이름으로 여러번 선언하면 자동으로 병합된다

```ts
interface User {
  name: string;
}
interface User {
  age: number;
}
let user: User = {
  name: "Alice",
  age: 30,
};
```

- 자율성이 높은 만큼, 어떻게 보면 위험할수도 있는 기능이다
- interface는 추상클래스랑 비슷한 개념이다
  - 이게 구현이 된건지 선언이된건지 헷갈릴수도 있다
- 객체지향 프로그래밍에서는 추상클래스를 안티패턴이라고 보긴 한다
- 선언과 구현이 함께 있어야 할 경우 필요하다

#### 호출 시그니처(Call Signature)

```ts
type FunctionAlias = (input: string) => number;

interface CallSignature {
  (input: string): number;
}

const typedFunctionAlias: FunctionAlias = (input) => input.length;
const typedCallSignature: CallSignature = (input) => input.length;
```

- 이런건 interface로 작성하는 것이 더 혼란스럽다

#### 인덱스 시그니처(Index Signature)

```ts
interface Counts {
  [key: string]: number;
}
const counts: Counts = {
  apples: 5,
  oranges: 10,
};
counts.bananas = 15;
```

- 어떨때 많이 쓰냐면, 객체의 키가 동적으로 변할때나 모를때 많이 쓴다

```ts
const counts: Counts = {};
counts.apples = 5;
counts.oranges = 10;
counts["peach"] * 10; // noUncheckedIndexedAccess 옵션에 의 에러가 발생한다 따라서
counts["peach"] ?? 0; // 이렇게 기본값을 설정해주는게 좋다
```

#### 중첩 인터페이스(Nested Interfaces)

```ts
interface MyNode {
  value: string | number;
  next: MyNode | null;
}
function push(currNode: MyNode, nextNode: MyNode) {
  currNode.next = nextNode;
}
const node: MyNode = { value: 1, next: null };
push(node, { value: 2, next: null });
console.log(node);
```

#### 확장

```ts
interface A {
  id: number;
}

interface B extends A {
  name: string;
}

const objB: B = {
  id: 1,
  name: "Object B",
};

console.log(objB);

// let leo: B = { id: 1 }; // 오류: 'name' 속성이 없습니다.
// let jane: B = { name: "Jane" }; // 오류: 'id' 속성이 없습니다.

type TypeA = {
  id: number;
};
type TypeB = {
  name: string;
} & TypeA;

const objTypeB: TypeB = {
  id: 2,
  name: "Type B",
};

console.log(objTypeB);
// 이렇게 타입으로 작성하는 방식이 더 트렌디하다
```

- `&`은 여기서는 intersection이 아닌 확장(extends) 개념으로 사용된다

```ts
type A = [string, number];
type RT1 = [boolean, A]; // [boolean, [string, number]]
type RT2 = [boolean, ...A]; // [boolean, string, number]
```

- 튜플 타입에서는 위와 같은 방식으로 타입확장이 가능하다

#### interface 타입 재정의 (type override)

- 객체지향에서는 자식으로 내려올수록 점점 구체화된다
- 따라서 확장할때는 더 구체화, narrowing해줘야한다

```ts
interface A {
  id: number;
  x: () => void; // void는 리턴을 뭘해도 상관없다라는 의미
}

interface B {
  id: number;
  name: string;
  x: () => string;
}

// OK?
interface C extends A, B {
  addr: string;
  // x: () => void; // 따라서 extends할때 void로 맞추면 에러가 난다
  x: () => string;
}

// A에서 x: () => number; 라면?? -> x의 리턴값이 number|string 과 같이 더 넓은 값으로 설정되어야한다
// C에서 x: () => void; 라면?? => x의 리턴값이 void로 좁아지기 때문에 에러가 난다
```

```ts
interface A {
  id: number | string;
}

interface B {
  id: string | number;
  name: string;
}

interface C extends A, B {
  id: string | number;
  addr: string;
}
// C에서 id: string|number|boolean; 라면?? => A,B의 id보다 더 넓은 값이기 때문에 에러가 난다
// C에서 id: string; 라면?? => A와 B의 id보다 더 좁은 값이기 떄문에 OK
```

```ts
interface A {
  id: number;
}

interface B {
  id: string;
  name: string;
}

//Interface 'C' cannot simultaneously extend types 'A' and 'B'.
//  Named property 'id' of types 'A' and 'B' are not identical.(2320)
interface C extends A, B {
  // ex) id 오류가 안나도록 다중 상속하려면??
  // id: any; // 이렇게 더 러프해질 수밖에 없다
  // 이는 앞으로 id에 대해서는 타입체크를 하지 않겠다는 것이다
  addr: string;
}
```

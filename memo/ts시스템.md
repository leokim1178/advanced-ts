### tsc 명령어

tsc -p : ./path/tsconfig.json는 특정 config파일로 컴파일해달라는 뜻
tsc --noEmit : js파일을 만들지 말것
tsc --target esnext : 강제로 버전 타겟을 바꾸는 명령어

bundle : ts or tsx -> js or jsx

tsc --watch | -w : 이 bundle작업을 자동으로 해주는 명령어다

### 타입 시스템

- 타입 규칙 집합
  1. 모든 타입과 값을 이해
  2. 초기 선언에서 가질 수 있는 타입 확인
  3. 추후 어떻게 사용될지 확인
  4. 사용법이 일치하지 않으면 에러표시

### 구문 오류 vs 타입 오류

- 구문(문법) 오류 : 타입스크립트가 자바스크립트로 변환되는 것을 차단한 경우
- 타입 오류 : 타입 검사기에 따라 일치하지 않는 것이 감지된 경우

### type annotation

```ts
let i: string = "dd";
```

여기서 `: string` 이 annotation 부분
AST에서 Annotated부분이 이부분을 설명해준다

- 불필요한 type annotation은 안쓰는게 관례다

```ts
let i: string = "dd"; // 불필요한 annotation
let j = "dd"; // 타입 추론에 의해 j는 string타입이 된다
```

### 같은 스코프에서 같은 이름의 변수 선언 불가

```ts
// ./a.ts
let a = 10;
// ./b.ts
let a = 20; // error
```

- ECMA 스크립트 사양에 따라 export 또는 import 문 없이 파일을 모듈로 만들어야 한다면 파일의 아무 곳에나 `export{};` 를 추가해 강제로 모듈이 되도록 함
- 이렇게 하면 같은 이름의 변수를 다른 파일에서 선언해도 에러가 나지 않는다

```ts
// ./a.ts
export {};
let a = 10;
// ./b.ts
export {};
let a = 20; // ok
```

- `export {}` 는 아무것도 내보내지 않는다는 뜻이다

### 타입스크립트를 대하는 자세

1. 가능하면 spread(...)를 이용하여 자료구조를 불변(immutable)로 만든다.
2. 모든것에 타입을 붙이고, 가능한 더 구체적으로 추론될 수 있도록 한다. (단, 너무 명시적 타입을 남발하지 않는다 - 추론이 가능하면 맡겨라)
3. 재사용할 수 있는 범용 코드를 만들려 항상 노력한다.
4. 발생할 수 없는 타입을 정의하려 하지 말라! (success + error(success가 false일 때만) + message)
5. literal type은 literal type이다!
6. tsconfig의 strict는 항상 true! any는 가능한 사용하지 말자! (cf. unknown)
7. Utility type과 Type Predicate를 활용하여 런타임 타입 체크에 도움이 되자!
8. 빈 객체({}) 타입은 null, undefined 를 제외한 모든 타입 커버 ⇒ 사용하지 말자!(즉, Object 타입을 사용하지 말고 object 타입은 그저 객체타입임을 나타낸다)
9. 변수명 보다는 타입명으로 식별자를 설명하자
10. JS 코드만으로 충분하다면 TS 코드 자제하자!!

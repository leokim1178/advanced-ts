## enum이란

열거형(enum)은 관련된 상수 값들의 집합에 이름을 부여하여 코드의 가독성과 유지보수성을 향상시키는 데 사용된다 TypeScript에서 enum은 다음과 같이 정의할 수 있다

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
```

- 같은 타입의 열거, 순서없는 자료 구조, Compile time에 고정 (JS emit 시 사라지지 않고 코드로 변경)
- 적절한 숫자(0부터 순서대로)를 추론해서 부여. 가독성은 좋으나 혼란을 야기한다

```ts
enum Score {
  A,
  B,
  C,
}

enum Score { // TS 내부에서는 다음과 같음
  A = 0,
  B = 1,
  C = 2,
}
```

- js로는 아래와 같이 변환된다

```js
var Score;
(function (Score) {
  Score[(Score["A"] = 0)] = "A";
  Score[(Score["B"] = 1)] = "B";
  Score[(Score["C"] = 2)] = "C";
})(Score || (Score = {}));
```

- 단점은 아래와 같은 혼란스러운 코드를 야기한다

```ts
let x: Score = Score.C;
let y: Score = 2;
if (x === Score.C) console.log("C");
if (x === 2) console.log("C");
if (Score[2]) console.log("C");
if (x === y) console.log("C");
```

- 위의 값이 전부 출력된다
- 왜 혼란스러울까?
  - **양방향 매핑**: enum은 이름→값, 값→이름 양방향 매핑을 생성한다. `Score["C"]`는 `2`이고, `Score[2]`는 `"C"`다.
  - **타입과 값의 혼동**: `Score.C`는 `2`라는 숫자 값이지만, `let y: Score = 2`처럼 직접 숫자를 할당해도 타입 에러가 발생하지 않는다.
  - **의미 없는 비교**: `x === 2`가 가능하다는 것은 enum의 타입 안정성이 약하다는 의미다. `2`가 `Score.C`를 의미하는지 알 수 없다.
  - **런타임 객체**: JavaScript로 변환되면 실제 객체가 생성되어 번들 크기가 증가한다.
  - **역방향 조회**: `Score[2]`처럼 숫자로 enum 이름을 조회할 수 있는데, 이는 대부분의 경우 필요하지 않은 기능이다.

### enum vs const enum

**일반 enum**:

- JavaScript로 변환 시 실제 객체 코드가 생성된다
- 런타임에 존재하는 실제 객체
- 양방향 매핑 지원 (역방향 조회 가능)
- 번들 크기 증가

```ts
enum Score {
  A = 0,
  B = 1,
  C = 2,
}
// JavaScript로 변환 시:
// var Score;
// (function (Score) {
//   Score[Score["A"] = 0] = "A";
//   Score[Score["B"] = 1] = "B";
//   Score[Score["C"] = 2] = "C";
// })(Score || (Score = {}));
```

**const enum**:

- 컴파일 타임에만 존재하고 JavaScript로 변환 시 완전히 인라인된다
- 런타임에 객체가 생성되지 않음
- 역방향 조회 불가능
- 번들 크기 감소
- 더 나은 성능

```ts
const enum Score {
  A = 0,
  B = 1,
  C = 2,
}

let x = Score.C;
// JavaScript로 변환 시:
// let x = 2; // 값이 직접 인라인됨
```

**주의사항**:

- `const enum`은 `--isolatedModules` 옵션과 함께 사용할 수 없다 (Babel 등에서 문제)
- 외부 라이브러리에서 `const enum`을 사용하면 타입 정의만 있고 실제 값이 없어 문제가 발생할 수 있다

위와 같이 const enum을 사용하면 런타임에도 영향을 주지 않으면서 enum의 장점을 활용할 수 있다
그러나 여전히 enum을 사용한다는 것 자체가 혼란을 주기 때문에
const assertion이나 union 타입 리터럴 타입을 사용하는 것이 더 나은 선택일 수 있다

```ts
type Score = "A" | "B" | "C";
const x: Score = "C";
console.log(x);
```

혹은

```ts
const Score = {
  A: "A",
  B: "B",
  C: "C",
} as const;
type Score = (typeof Score)[keyof typeof Score];
const x: Score = Score.C;
console.log(x);
```

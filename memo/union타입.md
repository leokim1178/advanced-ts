타입은 관례상 대문자
타입 alias는 다음과 같이 작성함

```ts
type User = {
  id: number;
  name: string;
  age: number;
  address: string;
};

interface IUser {
  id: number;
  name: string;
  age: number;
  address: string;
}
```

- interface와 type alias의 차이점

  - interface는 선언 병합이 가능
  - type alias는 선언 병합이 불가능
  - interface는 extends 키워드를 사용하여 상속 가능
  - type alias는 & 연산자를 사용하여 결합 가능

- 고민이 들때
  - 객체 타입을 정의할 때는 interface를 사용
  - 유니언 타입, 튜플 타입, 프리미티브 타입 등을 정의할 때는 type alias를 사용

interface는 class와 동급
class는 constructor가 있는 function object
interface는 constructor가 없는 function object

### literal 타입

```ts
const stringLiteral = "LITERAL";
// 이렇게 하면 strltr은 'A'라는 타입이 된다
let str: string;
```

- string literal 타입은 원시타입보다 더 구체적인 타입이다

### 유니언 타입

- 값에 허용되는 타입을 두개 이상의 가능한 타입으로 확장하는것
- 교집합의 느낌 (반대로 intersection 타입은 합집합의 느낌)

### type narrowing

- 유니언 타입에서 특정 타입으로 좁히는 것
- 심볼 테이블에 타입들이 기록되어 있다
- 이 심볼을 비교해서 타입을 좁힌다

```ts
type Fish = {
  swim: () => void;
};
type Bird = {
  fly: () => void;
};
type Pet = Fish | Bird;
...
...
const pet = { swim: () => {
    console.log("swimming");
  },
} as Pet;
// pet이 Fish인지 Bird인지 모름
if ("swim" in pet) {
  pet.swim(); // pet이 Fish로 좁혀짐
} else {
  pet.fly(); // pet이 Bird로 좁혀짐
}
```

2. typeof 연산자 사용

```ts
type Member = {
  name: string;
  spend: number[];
  addr: string;
  discountRate: number;
};
type Guest = {
  name: string;
  spend: number;
  age: number;
};

const member: Member = {
  name: "Alice",
  spend: [1000, 30000, 50000],
  addr: "Seoul",
  discountRate: 0.1,
};
const guest: Guest = {
  name: "Bob",
  spend: 5000,
  age: 25,
};

const who = Math.random() > 0.5 ? member : guest;

let totalAmount: number;
if (typeof who.spend !== "number") {
  // who.spend가 number가 아니라면 number[] 타입으로 좁혀짐
  totalAmount = who.spend.reduce((s, c) => s + c, 0);
} else {
  totalAmount = who.spend;
}
// who.spend.reduce((s, c) => s + c, 0); // Error!!
```

reduce는 Array 타입에만 존재한다.
조건식 블록 내에서는 타입이 좁혀진다.

블록을 빠져나오면 who.spend의 타입은 다시 number | number[] 타입이 되므로 reduce() 함수 사용 불가 => 타입스크립트는 truthy로 확인된
일부에 한해서만 변수의 타입을 좁힐 수 있다.

3. 조건 검사를 통한 narrowing

```ts
let h = Math.random() > 0.5 && "hello";
if (h) h.toUpperCase(); // h는 string 타입으로 좁혀짐
else console.log("h is falsy");
```

h는 boolean | string 타입이었지만 if문 조건식에서 truthy로 확인되었으므로 블록 내에서는 string 타입으로 좁혀진다.

4. strictNullChecks 옵션

- 엄격한 null 검사 옵션
- null 혹은 undefined 타입을 참조/할당했을 때 타입에러 발생 여부를 설정하는 옵션이다

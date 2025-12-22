# TypeScript 클래스: 타입 안전성과 함께하는 OOP

TypeScript에서 클래스는 단순한 객체지향 프로그래밍 도구가 아니라, 강력한 타입 시스템과 결합되어 더욱 안전하고 예측 가능한 코드를 작성할 수 있게 해줍니다. 오늘은 TypeScript 클래스의 주요 특징들을 살펴보겠습니다.

## 클래스도 타입이다

JavaScript와 달리 TypeScript에서는 클래스 자체가 타입으로 사용될 수 있습니다. 이는 TypeScript가 구조적 타입 시스템을 사용하기 때문인데, 클래스의 구조만 일치하면 해당 타입으로 인정됩니다.

```ts
class Teacher {
  sayHello() {
    console.log("Take chances, make mistakes, get messy!");
  }
}

// 클래스를 타입으로 사용
let teacher: Teacher;

// 구조적 타입 체킹으로 아래도 가능
teacher = {
  sayHello() {
    console.log("Hello!");
  },
};
```

## 클래스 속성 초기화

TypeScript에서 클래스를 사용할 때 가장 먼저 마주치는 특징은 **엄격한 속성 초기화 검사**입니다.

```ts
class SampleClass1 {
  name: string; // 초기화 안 했다는 오류 발생!

  constructor(name: string) {
    this.name = name; // 생성자에서 초기화
  }
}

class SampleClass2 {
  name!: string; // Non-null assertion

  setName(name: string) {
    this.name = name;
  }
}
```

`!` (non-null assertion)을 사용하면 이 속성이 반드시 초기화될 것임을 TypeScript에게 약속하는 것입니다. 하지만 이는 타입 체크를 우회하는 것이므로 주의해서 사용해야 합니다.

### StrictNullCheck와 초기화 검사

```ts
class MissingInitializer {
  property: string; // StrictNullCheck가 false면 오류 없음
}

new MissingInitializer().property.length;
// 런타임 에러: Cannot read property 'length' of undefined
```

`strictNullChecks` 또는 `strictPropertyInitialization` 옵션이 꺼져있으면 컴파일 타임에는 문제없지만, 런타임에서 예상치 못한 오류가 발생할 수 있습니다.

## readonly: 불변성 보장

`readonly` 키워드를 사용하면 속성을 읽기 전용으로 만들 수 있습니다.

```ts
class Quote {
  readonly text: string;

  constructor(text: string) {
    this.text = "hello"; // 생성자에서만 할당 가능!
  }

  emphasize() {
    this.text += "!"; // 오류: 읽기 전용 속성에 할당할 수 없음
  }
}
```

### 리터럴 타입과 readonly

`readonly`와 타입 애너테이션을 함께 사용할 때 주의할 점이 있습니다.

```ts
class RandomQuote {
  readonly explicit: string = "Hello, Typescript"; // 타입: string
  readonly implicit = "Hello, Typescript"; // 타입: "Hello, Typescript"

  constructor() {
    if (Math.random() > 0.5) {
      this.explicit = "Hi"; // OK
      this.implicit = "Hi"; // 오류: "Hi"는 "Hello, Typescript"에 할당 불가
    }
  }
}
```

명시적으로 타입을 지정하지 않으면 리터럴 타입으로 좁혀집니다. `string` 타입으로 확장하려면 타입 애너테이션이 필요합니다.

## 클래스와 인터페이스

인터페이스의 본래 목적은 **클래스가 구현해야 할 계약(contract)을 정의**하는 것입니다.

```ts
interface Learner {
  name: string | number;
  study(hours: number): void;
}

class Student implements Learner {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  study(hours: number) {
    for (let i = 0; i < hours; i += 1) {
      console.log("studying...");
    }
  }
}
```

### 중요한 특징들

1. **타입 추론 안 됨**: TypeScript는 인터페이스에서 클래스의 메서드나 속성 타입을 추론하지 않습니다. `study` 메서드에서 `hours` 타입을 명시하지 않으면 `any`로 추론되어 오류가 발생합니다.

2. **구현만 강제**: 인터페이스를 구현해도 클래스의 사용 방식은 변경되지 않습니다.

## 다중 인터페이스 구현

하나의 클래스가 여러 인터페이스를 구현할 수 있지만, 충돌이 발생하면 문제가 됩니다.

```ts
interface AgeIsANumber {
  age: number;
  m(): void;
}

interface AgeIsNotANumber {
  age: () => string;
  m(n: number): void;
}

class AsNumber implements AgeIsANumber, AgeIsNotANumber {
  age = 0; // 오류: number는 () => string에 할당 불가
}
```

### 다중 구현 규칙

**동일한 속성/메서드명이 있을 때:**

- **속성**: 타입이 일치하지 않으면 오류
- **메서드**: **반공변성(ContraVariance)** 적용 - 시그니처가 더 작은 쪽이 선택됨

### 인터페이스 상속 규칙

- **메서드**: 반공변성으로 상속 가능 (자식이 부모보다 구체적이어야 함)
- **속성**: 타입이 일치하지 않으면 오류

```ts
interface AgeIsANumber {
  age: (n: number, s: string, x: boolean) => string;
  m(n: number): void;
}

interface AgeIsNotANumber extends AgeIsANumber {
  age: (n: number, s: string) => string; // OK: 더 구체적
  m(): void; // OK: 더 구체적
}
```

## 속성 vs 메서드

클래스에서 함수를 선언하는 두 가지 방식이 있습니다.

```ts
class WithProperty {
  myProperty: () => void;

  constructor() {
    this.myProperty = () => {
      console.log("Hello, this is myProperty!");
    };
  }
}
```

화살표 함수로 속성을 정의하면:

- 각 인스턴스마다 새로운 함수 생성
- `this` 바인딩이 자동으로 처리됨
- 메모리와 시간 비용 증가

리액트의 클래스 컴포넌트에서 이벤트 핸들러를 화살표 함수로 선언하는 것이 이런 패턴입니다.

## 마무리

TypeScript의 클래스는 JavaScript의 클래스 문법에 타입 안전성을 더한 것입니다. 특히:

- **엄격한 초기화 검사**로 undefined 접근 방지
- **readonly**로 불변성 보장
- **인터페이스 구현**으로 계약 기반 프로그래밍
- **구조적 타입 시스템**으로 유연한 타입 체킹

JavaScript에서 TypeScript로 전환할 때 가장 어려운 부분 중 하나가 클래스와 함수인데, 이러한 특징들을 이해하면 더 안전하고 유지보수하기 좋은 코드를 작성할 수 있습니다.

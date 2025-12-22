class도 타입이 될수 있다

js를 ts로 바꿀때 가장 어려운게 함수다

class는 선언부에서 attribute를 일반 object 처럼 작성하면 에러가 난다

```ts
class SampleClass1 {
  name: string; // 이렇게 그냥 선언하면 초기화를 안했다는 오류가 발생한다
  // 따라서 아래와 같이 생성자에서 초기화 해줘야한다
  constructor(name: string) {
    this.name = name;
  }
}

class SampleClass2 {
  name!: string;
  // not null assertion을 사용하면 name에 대한 값이 반드시 초기화 할 것을 약속해주기 때문에 위와 같은 사례가 발생하지 않는다
  setName(name: string) {
    this.name = name;
  }
}

const leo = new SampleClass1("leo");
// const leo = new SampleClass1(); // 생성자에 값이 없으면 오류가 발생할것이다
const jane = new SampleClass2();
jane.setName("jane");

console.log(leo.name);
console.log(jane.name);
```

### 클래스 속성 - 초기화 검사

- 엄격한 초기화 검사(StrictNullCheck)가 없다면, 비록 타입시스템이 undefined 값에 접근할 수 없다고 말할지라도
  클래스 인스턴스는 undefined 값에 접근할 수 있음

```ts
class MissingInitializer {
  property: string; // StrictNullCheck가 false라면 오류 안남! (모두 off)
  // {StrictNullCheck: true} && (strictPropertyInitialization: false)
}

new MissingInitializer().property.length;
// TypeError : Cannot read property 'length' of undefined

// → Ts Config에서 StrictNullCheck(또는 strictPropertyInitialization) 끄면 OK!
```

### readonly

- writable하지 못하고 수정할 수 없다

```ts
class Quote {
  readonly text: string;
  constructor(text: string) {
    this.text = "hello"; // constructor에서만 가능!!
  }

  emphasize() {
    this.text += "!";
  } // Error : Cannot assign to 'text' because it is a read-only property.
}

const quote = new Quote("Hello");
Quote.text = "hi!"; // cf.  quote.text = 'hi';
//Error : Property 'text' does not exist on type 'typeof Quote'.
```

- 리터럴 타입의 경우 가능한 한 좁혀진 리터럴 타입으로 유추된다

```ts
class RandomQuote {
  readonly explicit: string = "Hello, Typescript"; // 명시적 타이핑
  readonly implicit = "Hello, Typescript"; // Literal Type!  // 암묵적 타이핑

  // 처음에는 모두 문자열 리터럴로 선언되므로 string 타입으로 확장하기 위해서는 타입 애너테이션이 필요.
  constructor() {
    if (Math.random() > 0.5) {
      this.explicit = "Hi"; // OK
      this.implicit = "Hi";
      // Error : Type '"Hi"' is not assignable to type '"Hello, Typescript"'.
    }
  }
}

const qoute2 = new RandomQuote();
qoute2.explicit; // 타입 : string
qoute2.implicit; // 타입 : "Hello, Typescript"
```

### 타입으로서의 클래스

```ts
class Teacher {
  sayHello() {
    console.log("Take chances, make mistakes, get messy!");
  }
} // Teacher 클래스의 이름은 teacher 변수에 주석(타입정의)을 다는데 사용됨

-> 클래스를 타입으로 만들면 아래와 같다

type Teacher = {
  sayHello: () => void;
};
```

같은 타입이다

```ts
teacher = {
  sayHello() {},
}; // Is this OK?? (:구조적 타입 체킹 - 구조만 같으면 통과! Exact-matching은 freshness 체크 X)
```

### 클래스와 인터페이스

- 인터페이스의 원래 목적은 이거다

```ts
interface Learner {
  name: string | number;
  study(hours: number): void;
}

class Student implements Learner {
  name;

  constructor(name: string) {
    this.name = name;
  }

  study(hours: number) {
    for (let i = 0; i < hours; i += 1) {
      console.log("studying...");
    }
  }
}

class Slacker implements Learner {}
// Error : Class 'Slacker' incorrectly implements interface 'Learner'.
// Type 'Slacker' is missing the following properties from type 'Learner': name, study
```

- 인터페이스를 구현하는 것으로 클래스를 만들어도 클래스가 사용되는 방식은 변경되지 않는다
- 클래스가 이미 인터페이스와 일치하는 경우 타입 검사기는 인터페이스의 인스턴스가 필요한 곳에서 해당 인스턴스를 사용할 수 있도록 허용한다
- 타입스크립트는 인터페이스에서 클래스의 메서드 또는 속성 타입 유추하지 않는다 (study함수에서 hours의 타입을 지정하지 않으면 any로 오류가 발생한다)

### 다중 인터페이스 구현

- 두 개의 충돌하는 인터페이스를 구현하는 클래스를 선언하려고 하면 클래스에 하나 이상의 타입 오류 발생

```ts
interface AgeIsANumber {
  age: number;
  m(): void; // OK
}
interface AgeIsNotANumber {
  age: () => string;
  m(n: number): void;
}

class AsNumber implements AgeIsANumber, AgeIsNotANumber {
  age = 0;
  // Error : Property 'age' in type 'AsNumber' is not assignable to the same property in base type 'AgeIsNotANumber'.
  // Type 'number' is not assignable to type '() => string'.
}

class NotAsNumber implements AgeIsANumber, AgeIsNotANumber {
  age() {
    return "";
  }
  // Error : Property 'age' in type 'NotAsNumber' is not assignable to the same property in base type 'AgeIsANumber'.
  // Type '() => string' is not assignable to type 'number'.
}
```

위와같이 두 인터페이스가 매우 다른 객체 형태를 표현하는 경우에는 하나의 클래스로 구현하지 않아야 한다

다중 구현 규칙 (동일 속성/메소드 명)

- 속성 ⇒ 일치하지 않으면 Error
- 함수 & 함수 ⇒ ContraVariance (합쳐졌을 때 시그니처가 작은쪽 승리)

interface 상속 규칙 (동일 속성/메소드 명)

- 함수는 contraVariance로 상속 가능 (부모보다 자식이 작아야)
  ⇒ 함수 override의 경우에도 contra-variance(더 구체적이어야!)
- 함수가 아닌 속성은 일치하지 않으면 Error!
  결국 구현되는 메소드(함수)는 작은 스펙(시그니처)가 된다!

```ts
interface AgeIsANumber {
  // name: string; // 함수가 아닌 속성
  age: (n: number, s: string, x: boolean) => string;
  m(n: number): void;
}
interface AgeIsNotANumber extends AgeIsANumber {
  // name: number; // Error(:Exact-only)
  age: (n: number, s: string) => string;
  m(): void;
}
```

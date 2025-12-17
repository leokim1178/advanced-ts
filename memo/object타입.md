object 타입 : 객체를 정의하는 타입

## variance (변성)

TypeScript에서 variance는 타입 간의 할당 가능성(assignability)을 결정하는 중요한 개념입니다.

### Covariance (공변성)

- **정의**: 더 구체적인 타입(subtype)이 더 일반적인 타입(supertype)으로 할당될 수 있는 성질
- **예시**: 작은 개념이 더 큰 개념으로 들어가는 것
- **적용 대상**: 반환 타입(return type)

```ts
class Animal {
  name: string;
}

class Dog extends Animal {
  bark(): void {}
}

// Covariance 예시 - 반환 타입
type AnimalGetter = () => Animal;
type DogGetter = () => Dog;

let getAnimal: AnimalGetter;
let getDog: DogGetter = () => new Dog();

// OK: Dog는 Animal의 subtype이므로 할당 가능 (공변성)
getAnimal = getDog;
```

### Contravariance (반공변성)

- **정의**: 더 일반적인 타입(supertype)이 더 구체적인 타입(subtype)으로 할당될 수 있는 성질
- **예시**: 더 큰 개념이 작은 개념으로 들어가는 것
- **적용 대상**: 함수 매개변수(parameter)

```ts
// Contravariance 예시 - 매개변수
type AnimalHandler = (animal: Animal) => void;
type DogHandler = (dog: Dog) => void;

let handleAnimal: AnimalHandler = (animal) => {
  console.log(animal.name);
};
let handleDog: DogHandler;

// OK: Animal 핸들러는 Dog도 처리할 수 있으므로 할당 가능 (반공변성)
handleDog = handleAnimal;

// NOT OK: Dog 핸들러는 모든 Animal을 처리하지 못할 수 있음
// handleAnimal = handleDog; // Error
```

### Invariance (불변성)

- **정의**: 정확히 같은 타입만 할당 가능한 성질
- **예시**: 제네릭 타입의 읽기/쓰기가 모두 가능한 경우

```ts
// Invariance 예시
type Box<T> = {
  value: T;
  setValue: (v: T) => void;
};

let animalBox: Box<Animal>;
let dogBox: Box<Dog>;

// NOT OK: Box는 읽기와 쓰기가 모두 가능하므로 불변성
// animalBox = dogBox; // Error
// dogBox = animalBox; // Error
```

### Bivariance (양변성)

- **정의**: 공변성과 반공변성이 모두 허용되는 성질
- **주의**: TypeScript에서 `strictFunctionTypes` 옵션이 false일 때 함수 매개변수가 양변성을 가집니다 (권장하지 않음)

```ts
// strictFunctionTypes: false 일 때
type Handler<T> = (arg: T) => void;

let animalHandler: Handler<Animal>;
let dogHandler: Handler<Dog>;

// 양방향 할당 모두 가능 (비안전)
animalHandler = dogHandler; // bivariance
dogHandler = animalHandler; // bivariance
```

### 핵심 원칙

1. **매개변수는 contravariant하다** (반공변성)
   - 함수를 안전하게 호출하기 위해 더 넓은 타입을 받을 수 있어야 함
2. **반환 타입은 covariant하다** (공변성)

   - 함수의 결과는 더 구체적인 타입을 반환해도 안전함

3. **strictFunctionTypes 옵션**
   - `true` (권장): 함수 매개변수가 올바르게 contravariant로 동작
   - `false`: 함수 매개변수가 bivariant로 동작 (타입 안정성 저하)

```ts
class Animal {
  name: string;
}

class Dog extends Animal {
  bark(): void {}
}

// 매개변수: contravariant
// 반환타입: covariant
type Transform = (input: Animal) => Dog;

let fn1: (input: Dog) => Dog;
let fn2: (input: Animal) => Animal;
let fn3: Transform;

// OK: 매개변수는 더 넓게(Animal), 반환은 더 좁게(Dog)
fn3 = fn1; // Error - 매개변수가 더 구체적 (contravariance 위반)
fn3 = fn2; // Error - 반환타입이 더 일반적 (covariance 위반)
```

interface HasBothFunctionTypes {
  readonly property: () => string; // 속성 구문
  method(): string; // 메서드 구문
  property2?: () => string; // optional 속성 구문
  method2?(): string; // optional 메서드 구문
}

const hasBoth: HasBothFunctionTypes = {
  property: () => "This is a property function",
  method() {
    return "This is a method function";
  },
  property2: () => "This is an optional property function", // property2 는 속성 구문으로 타입이 정의 되었지만 메서드로 사용이 가능하다
  method2() {
    return "This is an optional method function";
  },
};

// 호출 시그니처

type FunctionAlias = (input: string) => number;

interface CallSignature {
  (input: string): number;
}

const typedFunctionAlias: FunctionAlias = (input) => input.length;
const typedCallSignature: CallSignature = (input) => input.length;

// 이런건 interface로 작성하는 것이 더 혼란스럽다

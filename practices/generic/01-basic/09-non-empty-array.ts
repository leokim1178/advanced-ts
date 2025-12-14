type NonEmptyArray<T> = [T, ...Array<T>] // 스프레드 연산자 사용
// 최소 한개의 인자를 가지고 있는 array를 만들수있다

export const makeEnum = (values: NonEmptyArray<string>) => {
};

makeEnum(["a"]);
makeEnum(["a", "b", "c"]);

// @ts-expect-error
makeEnum([]);

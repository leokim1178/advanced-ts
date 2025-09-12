export type Maybe<T extends {}> = unknown;
// empty object를 넣으면 null과 undefined를 제외한 모든 인자가 가능하다
type tests = [
    // @ts-expect-error
    Maybe<null>,
    // @ts-expect-error
    Maybe<undefined>,

    Maybe<string>,
    Maybe<false>,
    Maybe<0>,
    Maybe<"">,
];

import {expect, it} from "vitest";
import {Equal, Expect} from "../../helper";

const makeSafe =
    <TFunc extends (...args: any[]) => any>(func: TFunc) =>
        (
            ...args: Parameters<TFunc>
        ):
            {
                type: "success";
                result: ReturnType<TFunc>;
            }
            | {
            type: "failure";
            error: Error;
        } =>
            // 인자로 설정된 함수의 타입을 위와 같이 추론시킨다
        {
            try {
                const result = func(...args);

                return {
                    type: "success",
                    result,
                };
            } catch (e) {
                return {
                    type: "failure",
                    error: e as Error,
                };
            }
        };
// 이렇게 성공과 실패 케이스를 구별 가능한 유니온 타입 객체로 반환하여,
// 함수 호출부에서 반환 타입만 보고도 결과를 안전하게 처리하도록 유도

it("Should return the result with a { type: 'success' } on a successful call", () => {
    const func = makeSafe(() => 1);

    const result = func();

    expect(result).toEqual({
        type: "success",
        result: 1,
    });

    type tests = [
        Expect<
            Equal<
                typeof result,
                | {
                type: "success";
                result: number;
            }
                | {
                type: "failure";
                error: Error;
            }
            >
        >,
    ];
});

it("Should return the error on a thrown call", () => {
    const func = makeSafe(() => {
        if (1 > 2) {
            return "123";
        }
        throw new Error("Oh dear");
    });

    const result = func();

    expect(result).toEqual({
        type: "failure",
        error: new Error("Oh dear"),
    });

    type tests = [
        Expect<
            Equal<
                typeof result,
                | {
                type: "success";
                result: string;
            }
                | {
                type: "failure";
                error: Error;
            }
            >
        >,
    ];
});

it("Should properly match the function's arguments", () => {
    const func = makeSafe((a: number, b: string) => {
        return `${a} ${b}`;
    });

    // @ts-expect-error
    func();

    // @ts-expect-error
    func(1, 1);

    func(1, "1");
});

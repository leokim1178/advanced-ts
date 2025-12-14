import {expect, it} from "vitest";
import {Equal, Expect} from "../../helper";

export class Component<T> { // 이렇게 클라스의 인자를 지정할수 있다
    private props: T; // 아래에서 그대로 활용할수 있다

    constructor(props: T) {
        this.props = props;
    }

    getProps = () => this.props;
}

it("Should create an object containing props", () => {
    const component = new Component({a: 1, b: 2, c: 3});

    const result = component.getProps();

    expect(result).toEqual({a: 1, b: 2, c: 3});

    type tests = [
        Expect<Equal<typeof result, { a: number; b: number; c: number }>>,
    ];
});

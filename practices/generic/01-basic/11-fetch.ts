import {expect, it} from "vitest";
import {Equal, Expect} from "../../helper";

const fetchData = async <T> // 리턴 타입을 함수의 에로우 펑션 앞에 배치한다
(url: string) => {
    const data: T // 이렇게 리턴타입을 명시한다
        = await fetch(url).then((response) => response.json());
    return data;
};

it("Should fetch data from an API", async () => {
    const data = await fetchData<{ name: string }>(
        "https://swapi.dev/api/people/1",
    );
    expect(data.name).toEqual("Luke Skywalker");

    type tests = [Expect<Equal<typeof data, { name: string }>>];
});

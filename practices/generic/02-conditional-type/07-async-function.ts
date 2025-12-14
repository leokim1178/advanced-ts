import {Equal, Expect} from "../../helper";

const getServerSideProps = async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const json: { title: string } = await data.json();
    return {
        props: {
            json,
        },
    };
};

type InferPropsFromServerSideFunction<T> =
    T extends () => Promise<{ props: infer TData }> ? TData : never;
// extends 뒤의 적절한 패턴을 만들어내는 것이 중요하다

type tests = [
    Expect<
        Equal<
            InferPropsFromServerSideFunction<typeof getServerSideProps>,
            { json: { title: string } }
        >
    >
];

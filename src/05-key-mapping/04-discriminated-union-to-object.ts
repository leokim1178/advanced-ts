import {Equal, Expect} from "../../helper";

type Route =
    | {
    route: "/";
    search: {
        page: string;
        perPage: string;
    };
}
    | { route: "/about"; search: {} }
    | { route: "/admin"; search: {} }
    | { route: "/admin/users"; search: {} };

type Keys = Route["route"]
type Search = Route["search"] // 이렇게 되면 {} or {page: string; perPage: string;} 인 유니온 타입이 만들어진다
// 따라서 다음과 같이 한다

type RoutesObject = {
    [R in Route as R["route"] // as를 사용하여 string값을 사용할 수 있게 한다
    ]: R["search"]
}

type tests = [
    Expect<
        Equal<
            RoutesObject,
            {
                "/": {
                    page: string;
                    perPage: string;
                };
                "/about": {};
                "/admin": {};
                "/admin/users": {};
            }
        >
    >,
];

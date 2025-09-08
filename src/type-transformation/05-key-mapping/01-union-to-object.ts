import {Equal, Expect} from "../../../helper";

type Route = "/" | "/about" | "/admin" | "/admin/users";

type RoutesObject = {
    [K in Route]: K;
}
// 일종의 for문이라고 생각하면 된다

// ex
// 첫번째 루프
// {
//     "/":"/"
// }
// 두번째 루프
// {
//     "/":"/"
//     "/about":"/about",
// }


type tests = [
    Expect<
        Equal<
            RoutesObject,
            {
                "/": "/";
                "/about": "/about";
                "/admin": "/admin";
                "/admin/users": "/admin/users";
            }
        >
    >,
];

import {Equal, Expect} from "../../../helper";

type Routes = "/users" | "/users/:id" | "/products" | "/products/:id";

// String Union 타입에서 Extract를 사용해 아래와 같이 타입을 정해서 걸러낼수도 있다
type DynamicRoutes = Extract<Routes, `/${string}/:id`>

type tests = [Expect<Equal<DynamicRoutes, "/users/:id" | "/products/:id">>];

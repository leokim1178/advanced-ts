type Path = `/${string}`;
// 다음과 같이
// value space 에서는 String Interpolation 이지만
// type space 에서는 위와 같이 타입 검증을 할수 있다
// 타입 검증을 해야하는 함수를 좀 더 안전하게 관리할수 있을듯

export function makeUrl(path: Path) {
    return `https://mywebsite.com${path}`
}

// Should be OK
makeUrl("/users");

// @ts-expect-error
makeUrl("users/1");

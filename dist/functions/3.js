"use strict";
const getUser = () => {
    return Promise.resolve({
        id: "123",
        name: "John",
        email: "john@example.com"
    });
};
// 1. 함수의 리턴 타입을 ReturnType으로 추론
// 2. Promise 일 경우 Awaited를 사용하여 추론

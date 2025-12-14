
// interface, type은 타입 스페이스에만 존재한다
// 컴파일 이후에는 타입 어노테이션이 제거된다
interface Person{
    first : string;
    last : string;
}

// ---
const p:Person={
    first:"Jane",
    last:"Doe",
}
// ---
const v= typeof p;
type t = typeof p; // 컴파일 이후에는 js에는 남아있지 않는다

// ---
const first = p['first'];
// 컴파일 이전 단계에서는 string 타입을 가진다
type First=Person['first'];
// 이 코드는 컴파일 이후에는 자바스크립트로 변환되며 사라진다

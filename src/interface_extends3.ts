interface A {
  id: number | string;
}

interface B {
  id: string | number;
  name: string;
}

interface C extends A, B {
  id: string | number;
  addr: string;
}
// C에서 id: string|number|boolean; 라면?? => A,B의 id보다 더 넓은 값이기 때문에 에러가 난다
// C에서 id: string; 라면?? => A와 B의 id보다 더 좁은 값이기 떄문에 OK

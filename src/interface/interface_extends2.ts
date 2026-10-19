interface A {
  id: number;
  x: () => void; // void는 리턴을 뭘해도 상관없다라는 의미
}

interface B {
  id: number;
  name: string;
  x: () => string;
}

// OK?
interface C extends A, B {
  addr: string;
  // x: () => void; // 따라서 extends할때 void로 맞추면 에러가 난다
  x: () => string;
}

// A에서 x: () => number; 라면?? -> x의 리턴값이 number|string 과 같이 더 넓은 값으로 설정되어야한다
// C에서 x: () => void; 라면?? => x의 리턴값이 void로 좁아지기 때문에 에러가 난다

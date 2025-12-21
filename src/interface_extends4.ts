interface A {
  id: number;
}

interface B {
  id: string;
  name: string;
}

//Interface 'C' cannot simultaneously extend types 'A' and 'B'.
//  Named property 'id' of types 'A' and 'B' are not identical.(2320)
interface C extends A, B {
  // ex) id 오류가 안나도록 다중 상속하려면??
  // id: any; // 이렇게 더 러프해질 수밖에 없다
  // 이는 앞으로 id에 대해서는 타입체크를 하지 않겠다는 것이다
  addr: string;
}

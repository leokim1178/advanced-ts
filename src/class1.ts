class SampleClass1 {
  name: string; // 이렇게 그냥 선언하면 초기화를 안했다는 오류가 발생한다
  // 따라서 아래와 같이 생성자에서 초기화 해줘야한다
  constructor(name: string) {
    this.name = name;
  }
}

class SampleClass2 {
  name!: string;
  // not null assertion을 사용하면 name에 대한 값이 반드시 초기화 할 것을 약속해주기 때문에 위와 같은 사례가 발생하지 않는다
  setName(name: string) {
    this.name = name;
  }
}

const leo = new SampleClass1("leo");
// const leo = new SampleClass1(); // 생성자에 값이 없으면 오류가 발생할것이다
const jane = new SampleClass2();
jane.setName("jane");

console.log(leo.name);
console.log(jane.name);

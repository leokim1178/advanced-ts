// 값이 함수인 속성(property)을 선언하는 방식(not method)
class WithProperty {
  myProperty!: () => void; // Type 정의
}
console.log(new WithProperty().myProperty === new WithProperty().myProperty); // true???

const instance = new WithProperty();
instance.myProperty(); // OK?

class WithProperty2 {
  myProperty: () => void; // call signature
  constructor() {
    this.myProperty = () => {
      console.log("Hello, this is myProperty!");
    };
  }
}
const instance2 = new WithProperty2();
instance2.myProperty();
// 클래스의 인스턴스별로 새로운 함수가 생성되며,
// 항상 클래스 인스턴스를 가리켜야하는 화살표 함수에서
// this 스코프(method)를 사용하면
// 클래스 인스턴스당 새로운 함수를 생성하는 시간과 메모리 비용 측면에서 유용할 수 있음

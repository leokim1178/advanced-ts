type Member = {
  name: string;
  addr: string;
  discountRate: number;
};
type Guest = {
  name: string;
  age: number;
};

type Customer = Member | Guest;
let customer: Customer;
let member: Member;
let guest: Guest;

// customer = {
//   name: "홍길동",
//   age: 30,
//   addr: "서울시 강남구",
// };
// member = {
//   name: "홍길동",
//   addr: "서울시 강남구",
//   discountRate: 0.1,
// };
// guest = {
//   name: "홍길동",
//   age: 30,
// };

const x = {
  name: "Alice",
  addr: "123 Main St",
  age: 25,
};

customer = x; // OK
member = x; // Error : discountRate 속성이 없음
guest = x; // OK

const y = {
  name: "Bob",
  addr: "456 Elm St",
  discountRate: 0.15,
};

customer = y; // OK
member = y; // OK
guest = y; // Error : age 속성이 없음

const z = {
  name: "Charlie",
  age: 40,
  addr: "789 Oak St",
  discountRate: 0.2,
};

customer = z; // OK
member = z; // OK
guest = z; // OK

customer.age = 35; // Error : customer가 Member일 수도 있기 때문
customer.addr = "New Address"; // Error : customer가 Guest일 수도 있기 때문
member.discountRate = 0.2; // OK

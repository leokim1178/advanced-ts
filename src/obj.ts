let xuser: { id: number; name: string };
xuser = { id: 1, name: "taeyeong" }; // OK
xuser = { id: 1, name: "taeyeong", age: 30 }; // ERROR
// 위의 코드는 날것 그대로(freshness)의 객체 리터럴을 할당했기 때문에 에러가 난다
// 위와 같이 에러를 내는 이유는 객체 리터럴을 할당할 때 실수로 프로퍼티를 더 많이 적는 경우를 방지하기 위해서이다
// 따라서 객체를 하드코딩할때 실수를 방지하기 위해서이다
const tmp = { id: 1, name: "taeyeong", age: 30 };
// 이렇게 tmp에 할당을 하면 freshness가 사라지기 때문에 에러가 나지 않는다
xuser = tmp; // OK

type User = { id: number; name: string };
xuser = { id: 1, name: "taeyeong", age: 30 } as User; // OK
// as 키워드를 사용해서 타입 단언을 하면 에러가 나지 않는다

const beginner = { nickName: "newbie", level: 1 };
const warrior = { nickName: "strong", position: "warrior" };
const leo = Math.random() > 0.5 ? beginner : warrior;
leo.nickName; // OK
leo.level; // ERROR
// 유추가능한 교집합이 nickName밖에 없기 때문에 level에 접근할 수 없다

const character =
  Math.random() > 0.5
    ? {
        nickName: "newbie",
        level: 1,
      }
    : {
        nickName: "strong",
        position: "warrior",
      };
character.level; // number | undefined
character.position; // string | undefined
// 위와 같이 작성하면 level과 position에 접근할 수 있다
// 단, Math.random() > 0.5 조건에 따라서 undefined가 될 수 있기 때문에 유니언 타입이 된다

type Dog = { name: string; bark: () => void };
type Cat = { name: string; meow: () => void };
type Pet = Dog | Cat;
const pet: Pet =
  Math.random() > 0.5
    ? { name: "Buddy", bark: () => console.log("Woof!") }
    : { name: "Kitty", meow: () => console.log("Meow!") };
pet.bark(); // ERROR

if ("bark" in pet) {
  pet.bark(); // OK
} else {
  pet.meow(); // OK
}
// in 연산자를 사용해서 프로퍼티가 있는지 검사하면 타입 가드가 된다

function f(cb: (input: string | number) => number) {
  return cb(1);
}
function f2(input: string | number | boolean) {
  return 1;
}
function f3(input: string | number) {
  return 1;
}
function f4(input: string) {
  return 1;
}

f(f2); // OK
f(f3); // OK
f(f4); // ERROR
// 콜백 함수의 파라미터는 contravariant하기 때문에  유니언 타입이 더 넓은 쪽이 할당 가능하다
// f2의 파라미터는 string | number | boolean 이기 때문에 f의 파라미터인 string | number 보다 넓어서 할당 가능
// f3의 파라미터는 string | number 이기 때문에 f의 파라미터와 같아서 할당 가능
// f4의 파라미터는 string 이기 때문에 f의 파라미터보다 좁아서 할당 불가능

type TUser = { id: number; name: string };
type TUser2 = { id: number; name: string; addr?: string };

const arr: TUser[] = [
  { id: 1, name: "taeyeong" },
  { id: 2, name: "jisu", addr: "seoul" },
]; // addr에서 에러가 발생한다(freshness 때문에 발생)
const kim = { id: 3, name: "kim", addr: "busan" };
const arr2: TUser[] = [{ id: 1, name: "taeyeong" }, kim]; // OK
// 배열 리터럴에 객체 리터럴을 바로 넣으면 freshness 때문에 에러가 발생한다
// 따라서 객체 리터럴을 변수에 할당한 후에 배열에 넣으면 에러가 나지 않는다
const arr3: TUser[] = [
  { id: 1, name: "taeyeong" },
  { id: 2, name: "jisu", addr: "seoul" },
  kim, // 뒤에 오는 kim이 addr이 있으니까 그냥 허용해줄게
]; // OK
// 배열 리터럴 내의 객체 리터럴 중에서 하나라도 freshness가 사라진 객체가 있으면 전체 배열 리터럴의 freshness가 사라진다
const arr4: [TUser, TUser] = [
  { id: 1, name: "taeyeong" },
  { id: 2, name: "jisu", addr: "seoul" }, // ERROR
];
// 튜플 타입은 배열 리터럴의 freshness를 사라지게 하지 않는다
// 튜플은 array이긴 하지만 고정된 길이와 타입을 가지기 때문에 배열 리터럴의 freshness가 사라지지 않는다

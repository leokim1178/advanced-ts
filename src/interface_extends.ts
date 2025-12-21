interface A {
  id: number;
}

interface B extends A {
  name: string;
}

const objB: B = {
  id: 1,
  name: "Object B",
};

console.log(objB);

// let leo: B = { id: 1 }; // 오류: 'name' 속성이 없습니다.
// let jane: B = { name: "Jane" }; // 오류: 'id' 속성이 없습니다.

type TypeA = {
  id: number;
};
type TypeB = {
  name: string;
} & TypeA;

const objTypeB: TypeB = {
  id: 2,
  name: "Type B",
};

console.log(objTypeB);
// 이렇게 타입으로 작성하는 방식이 더 트렌디하다

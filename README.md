# advanced-ts

TypeScript 타입 시스템을 강의로 다시 정리하고, 타입 레벨 연습문제를 풀며 확인한 기록이다(2025-09~12).

- inflearn - `실전 연습으로 익히는 고급 타입스크립트 기술`
- inflearn - `@시코 - TypeScript 제대로 배우기`

## 구성

| 폴더 | 내용 |
| --- | --- |
| [`practices/generic/`](./practices/generic) | 제네릭 연습문제 30개 — 기본(13), 조건부 타입(9), 타입 인자 추론(5), 응용(3) |
| [`practices/type-transformation/`](./practices/type-transformation) | 타입 변환 연습문제 31개 — 함수 타입(4), 유니온(5), 인덱스 접근(7), 경로 타입(6), key remapping(8) 등 |
| [`memo/`](./memo) | 개념 노트 — 타입 시스템, 객체·유니온·배열/튜플 타입, 함수, 클래스, 인터페이스, enum 대신 쓸 것 |
| [`src/`](./src) | 노트의 개념을 시연하는 코드. 타입 에러를 보여주려고 일부러 남긴 줄이 있다 |
| [`blog/`](./blog) | 클래스 정리 글 초안 |

`practices/`는 `tsc --strict` 기준으로 타입 에러 없이 통과한다.

## 직접 확인한 것

- 메서드와 override 매개변수는 양방향(bivariant)으로 검사되고, `strictFunctionTypes`는 함수 타입 프로퍼티에만 적용된다 — [`memo/class.md`](./memo/class.md), [`memo/object타입.md`](./memo/object타입.md). `tsc --strict`로 두 선언 방식의 차이를 확인했다.
- 조건부 타입과 `infer`로 타입을 꺼내는 패턴 — [`practices/generic/02-conditional-type/`](./practices/generic/02-conditional-type)
- key remapping(`as`)으로 객체 키를 바꾸는 매핑 타입 — [`practices/type-transformation/05-key-mapping/`](./practices/type-transformation/05-key-mapping)

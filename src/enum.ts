enum Score {
  A,
  B,
  C,
}

let x: Score = Score.C;
let y: Score = 2;
if (x === Score.C) console.log("C");
if (x === 2) console.log("C");
if (Score[2]) console.log("C");
if (x === y) console.log("C");

const enum Score2 {
  A,
  B,
  C,
}

let a: Score2 = Score2.B;
let b: Score2 = 1;
if (a === Score2.B) console.log("B");
if (Score2[1]) console.log("B"); // 컴파일 에러
if (a === b) console.log("B");

// 배열
let numArr: number[] = [1, 2, 3];

let strArr: string[] = ["Hello", "im", "kwon"];

let boolArr: Array<boolean> = [true, false, true];

let arr: Array<number> = [1, 2, 3, 4];

// 배열에 들어가는 요소들의 타입이 다양할 경우
let multiArr: (number | string)[] = [1, "hello"];
let multiArrTest: Array<number | string> = [1, "string"];
console.log(multiArrTest);


// 다차원 배열의 타입을 정의하는 방법
let doubleArr: number[][] = [
  [1, 2, 3],
  [4, 5],
];

// 튜플
// - 자바스크립트에는 없고, TypeScript에서만 특별히 제공되는 타입이다.
// - 길이와 타입이 고정된 배열이다.

// number 타입의 값을 저장하고 길이가 2인 튜플 타입 정의
let tup1: [number, number] = [1, 2];

let tup2: [number, string, boolean] = [1, "2", true];

// 튜플을 사용하는 상황
// - 튜플을 사용하면 우리가 배열을 사용할 때 인덱스의 위치에 따라서
// 넣어야 하는 값들이 이미 정해져 있고, 그 순서를 지키는 게 중요할 때
// 튜플 타입 이용해서 값을 잘못 넣지 않도록 방지해 줄 수 있다.
const users: [string, number][] = [
  ["kwon", 1],
  ["park", 2],
  ["choi", 3],
  ["won", 4],
];

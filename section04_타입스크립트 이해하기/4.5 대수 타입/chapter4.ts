// 대수 타입
let a: string | number | boolean;

a = 1;
a = "hello";
a = true;

// 배열
let arr: (number | string | boolean)[] = [1, "hello", true];

// 객체 타입으로 유니온 타입 생성

type Dog = {
  name: string;
  color: string;
};

type Person = {
  name: string;
  language: string;
};

type Union1 = Dog | Person;

let union1: Union1 = {
  name: "",
  color: "",
};

let union2: Union1 = {
  name: "",
  language: "",
};

let union3: Union1 = {
  name: "",
  color: "",
  language: "",
};

// 합집합 Union1의 바깥에 존재한다.
// let union4: Union1 = { // 오류
//   name: "",
// };

// 교집합 타입 - Intetsection 타입
let variable: number & string;

type Dog = {
  name: string;
  color: string;
};

type Person = {
  name: string;
  language: string;
};

type Intersection = Dog & Person;

let intersection: Intersection = {
  name: "",
  color: "",
  language: "",
};

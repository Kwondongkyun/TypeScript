/**
 * 인터페이스
 */

interface Person {
  readonly name: string;
  age?: number;
  sayHi(): void; // 호출 시그니처 이용
  sayHi(a: number, b: number): void;
}

const person: Person = {
  name: "kwon",
  sayHi: function () {
    console.log("Hi");
  },
};

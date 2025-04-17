/**
 * 선언 합침
 */
interface Person {
  name: string;
}

interface Person {
  name: string;
  age: number;
}

const person: Person = {
  name: "",
  age: 25,
};

/**
 * 함수 타입 호환성
 * - 특정 함수 타입을 다른 함수 타입으로 취급해도 괜찮은가를 판단하는 것
 *
 * 2가지 체크리스트
 * 1. 반환값의 타입이 호환되는가
 * 2. 매개변수의 타입이 호환되는가
 */

// 기준1. 반환값이 호환되는가

type A = () => number; // number 타입 반환
type B = () => 10; // number 리터럴 타입 10 반환

let a: A = () => 10;
let b: B = () => 10;

a = b; // 허용 O
b = a; // 허용 X

// 기준 2. 매개변수가 호환되는가
// 상황 1. 매개변수의 개수가 같을 때
type C = (value: number) => void;
type D = (value: 10) => void;

let c: C = (value) => {};
let d: D = (value) => {};

c = d;
d = c;

// 예시) 매개변수가 객체 타입을 사용하는 예시

type Animal = {
  name: string;
};

type Dog = {
  name: string;
  color: string;
};

let animalFunc = (animal: Animal) => {
  console.log(animal.name);
};

let dogFunc = (dog: Dog) => {
  console.log(dog.name);
  console.log(dog.color);
};

animalFunc = dogFunc; // 업캐스팅 발생(오류)

// 위 코드는 아래와 같다.
let testFunc = (animal: Animal) => {
  // 매개변수의 타입은 animalFunc의 타입인 Animal 타입을 가진다.

  // 함수 본문 : dogFunc를 집어 넣었으므로 dogFunc의 본문을 따라간다.
  console.log(animal.name);
  console.log(animal.color); // 오류 발생 (Animal 타입에는 color라는 프로퍼티가 없기 때문이다.)
};

dogFunc = animalFunc; // 다운캐스팅 발생(정상 작동)

let testFunc2 = (dog: Dog) => {
  // 매개변수의 타입은 animalFunc의 타입인 Animal 타입을 가진다.
  console.log(dog.name); // 허용
};

// 상황 2. 매개변수의 개수가 다를 때

type Func1 = (a: number, b: number) => void;
type Func2 = (a: number) => void;

let func1: Func1 = (a, b) => {};
let func2: Func2 = (a) => {};

func1 = func2; // 허용
func2 = func1; // 불가

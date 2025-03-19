/**
 * 함수 타입 정의
 */

function func(a: number, b: number) {
  return a + b;
}

/**
 * 화살표 함수의 타입을 정의하는 방법
 */

const add = (a: number, b: number) => a + b;

/**
 * 함수의 매개변수
 */

// 선택적 매개변수
function introduce(name = "kwon", tall?: number) {
  console.log(`name : ${name}`);
  console.log(`tall : ${tall}`);
}

introduce();

// 나머지 매개변수(rest parameter)
function getSum(...rest: number[]) {
  let sum = 0;
  rest.forEach((i) => (sum += i));
  return sum;
}
console.log(getSum(1, 2, 3)); // 6
console.log(getSum(1, 2, 3, 4, 5)); // 15

// 매개변수 개수 고정하기(튜플 타입으로 설정)
function getSum2(...rest: [number, number, number]) {
  let sum = 0;
  rest.forEach((i) => (sum += i));
  return sum;
}

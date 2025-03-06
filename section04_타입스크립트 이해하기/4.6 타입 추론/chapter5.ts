/**
 * 타입 추론
 */

// let a: number = 10;
// let b = 10;

// 매개변수 타입 미지정 시 오류 발생
// function func(param) {}

/**
 * 타입 추론이 가능한 상황
 */

// 1. 일반적인 변수를 선언하는 상황
let a = 10;
let b = "hello";
let c = {
  id: 1,
  name: "kwon",
  profile: {
    nickname: "kwn",
  },
};

// 2. 객체의 구조분해 할당 시 타입 추론
let { id, name, profile } = c;

// 3. 배열의 구조분해 할당 시 타입 추론
let [one, two, three] = [1, "hello", true];

// 4. 함수의 타입 추론
function func() {
  return "hello";
}

// 5. 매개변수에 기본값이 설정된 함수
function func2(message = "hello") {
  return "hello";
}

/**
 * 특이한 타입 추론 상황
 */

// 1. 초기값을 생략한 변수 선언
let d;
d = 10;
d.toFixed();

d = "hello";
d.toUpperCase();

// 2. const 키워드를 이용한 변수 생성
const num = 10;

// 3. 여러가지 타입의 요소를 저장하는 배열
let arr = [1, "string"];

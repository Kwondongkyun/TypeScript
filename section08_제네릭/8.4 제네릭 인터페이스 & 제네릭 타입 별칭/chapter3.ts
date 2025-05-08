/**
 * 제네릭 인터페이스
 */

// 제네릭 인터페이스 생성
interface KeyPair<K, V> {
  key: K;
  value: V;
}

// KeyPair 타입을 갖는 변수 선언
let keyPair: KeyPair<string, number> = {
  key: "key",
  value: 0,
};

// 또 다른 변수 생성
let keyPair2: KeyPair<boolean, string[]> = {
  key: true,
  value: ["1"],
};

/**
 * 인덱스 시그니처
 */
interface NumberMap {
  [key: string]: number;
}

let numberMap1: NumberMap = {
  key: 123,
  key2: 1345,
};

interface Map<V> {
  [key: string]: V;
}

// 변수 생성

let stringMap: Map<string> = {
  key: "value",
};

let booleanMap: Map<boolean> = {
  key: true,
};

/**
 * 제네릭 타입 별칭
 */

// 위 Map 타입을 타입별칭으로 만들기
type Map2<V> = {
  [key: string]: V;
};

// Map2 타입 변수 생성
let stringMap2: Map2<string> = {
  key: "hello",
};

/**
 * 제네릭 인터페이스의 활용 예시
 * -> 유저 관리 프로그램
 * -> 유저 구분 : 학생 유저 / 개발자 유저
 */

// 학생 유저 인터페이스
interface Student {
  type: "student";
  school: string;
}

// 개발자 유저 인터페이스
interface Developer {
  type: "developer";
  skill: string;
}

// 학생, 개발자를 모두를 아우르는 유저 타입 선언
interface User<T> {
  name: string;
  profile: T;
}

function goToSchool(user: User<Student>) {
  const school = user.profile.school;
  console.log(`${school}로 등교 완료`);
}

// 개발자 유저 변수 선언
const developerUser: User<Developer> = {
  name: "kwon",
  profile: {
    type: "developer",
    skill: "TypeScript",
  },
};

// 학생 유저 변수 선언
const studentUser: User<Student> = {
  name: "kim",
  profile: {
    type: "student",
    school: "대학교",
  },
};

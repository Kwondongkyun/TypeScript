/**
 * 타입 단언
 */

type Person = {
  name: string;
  age: number;
};

// 빈 객체로만 설정해두고 나중에 프로퍼티의 값 초기화 시키기
let person = {} as Person;
person.name = "kwon";
person.age = 25;

type Dog = {
  name: string;
  color: string;
};

let dog = {
  name: "뽀삐",
  color: "brown",
  breed: "진도",
} as Dog;

/**
 * 타입 단언의 규칙
 * 값 as 단언 <- 단언식
 * A as B
 * A가 B의 슈퍼타입이거나
 * A가 B의 서브타입이어야 함
 */

let num1 = 10 as never;
let num2 = 10 as unknown;

let num3 = 10 as unknown as string;

/**
 * const 단언
 */

let num4 = 10 as const;

// 객체 타입과 함께 사용
let cat = {
  name: "야옹이",
  color: "yellow",
} as const;

// 프로퍼티의 값을 수정할 수 없는 객체가 된다.
// cat.name = "";

/**
 * Non Null 단언
 */

// 게시판 만들기 - 게시글 객체 타입 정의
type Post = {
  title: string;
  author?: string;
};

// 게시글 생성
let post: Post = {
  title: "게시글1",
  author: "kwon",
};

// 기능1 - author의 이름의 길이 세기
const len: number = post.author!.length;

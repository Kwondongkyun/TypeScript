enum Role {
  ADMIN,
  USER = 10,
  GUEST,
}

// enum의 멤버에 문자열 값도 할당
enum Language {
  korean = "ko",
  english = "en",
}

const user1 = {
  name: "kwon",
  role: Role.ADMIN, // 0 <- 관리자
  language: Language.korean,
};
const user2 = {
  name: "홍길동",
  role: Role.USER, // 1 <- 일반 유저
  language: Language.english,
};
const user3 = {
  name: "park",
  role: Role.GUEST, // 2 <- 게스트
  language: Language.korean,
};

console.log(user1, user2, user3);

// 타입 별칭
let user: {
  id: number;
  name: string;
} = {
  id: 1,
  name: "kwon",
};

// 여러개의 프로퍼티가 있을 경우
// 객체의 프로퍼티에 맞게 타입도 수정해야한다.
let user1: {
  id: number;
  name: string;
  nickname: string;
  birth: string;
  bio: string;
  location: string;
} = {
  id: 1,
  name: "kwon",
  nickname: "kdg",
  birth: "2001.09.26",
  bio: "안녕하세요",
  location: "성남시",
};

// 만약 2명 이상의 유저를 하나의 파일에서 변수로 만들어야 된다면 타입을 정의하는 코드가 길어진다.
// + 타입을 정의하는 코드가 중복된다.
let user2: {
  id: number;
  name: string;
  nickname: string;
  birth: string;
  bio: string;
  location: string;
} = {
  id: 1,
  name: "kwon",
  nickname: "kwn",
  birth: "2001.02.21",
  bio: "hi",
  location: "seoul",
};

// (해결책)
// 타입을 마치 변수처럼 정의해서 사용할 수 있는 타입 별칭 사용

// 타입 별칭으로 만든 User라는 타입이 생성된다.
type User = {
  id: number;
  name: string;
  nickname: string;
  birth: string;
  bio: string;
  location: string;
};

let user3: User = {
  id: 1,
  name: "kwon",
  nickname: "kwn",
  birth: "20202020",
  bio: "hi",
  location: "seoul",
};

let user4: User = {
  id: 2,
  name: "park",
  nickname: "p",
  birth: "2001.09.26",
  bio: "안녕하세요",
  location: "성남시",
};

// -> 중복코드가 제거된다.
// -> User 객체 타입에 새로운 프로퍼티가 필요하다라고 하면 그냥 type 별칭에 추가로 작성하면 된다.

// 타입 별칭 사용 시 조심할 점
// 동일한 스코프에 중복된 이름으로 타입별칭을 선언하면 오류가 발생한다.

// 타입스크립트의 type 관련 코드들은 컴파일 결과 자바스크립트 코드에서는
// 다 제거된다. -> 타입별칭으로 만든 타입도 제거된다.

// 인덱스 시그니처
type CountryCodes = {
  Korea: String;
  UnitedState: String;
  UnitedKingdom: string;
};

let countryCodes = {
  Korea: "ko",
  UnitedState: "us",
  UnitedKingdom: "uk",
};

// countryCodes에 모든 국가들의 코드를 다 넣어야 한다면 타입 별칭에도
// 모든 프로퍼티의 키를 다 넣어줘야한다.
// -> 끔찍하다

// 해결책 : 인덱스 시그니처
// - Key와 Value의 규칙을 기준으로 객체의 type 정의할 수 있는 문법이다.
// - 객체의 프로퍼티와 밸류에 타입 관련된 규칙을 보면 된다.
// - Key : string 타입, Value : string 타입인 프로퍼티들은 모두 허용하도록 타입 만들기

// 인덱스 시그니처를 이용한 타입 정의
type CountryCodes = {
  [key: string]: String;
};

let countryCodes: CountryCodes = {
  Korea: "ko",
  UnitedState: "us",
  UnitedKingdom: "uk",
};

// 인덱스 시그니처
// : Key와 Value의 타입을 기준으로 규칙을 이용해서 아주 유연하게 객체의 타입을 정의하는 문법이다.
// - Key와 Value의 타입이 어떤 규칙을 가지고 움직이는 이런 객체의 타입을 정의할 때 유용하게 사용될 수 있다.

// 인덱스 시그니처를 이용한 타입 정의
type CountryNumberCodes = {
  [key: string]: number;
};

let countryNumberCodes: CountryNumberCodes = {
  Korea: 410,
  UnitedStates: 840,
  UnitedKingdom: 826,
};

// 인덱스 시그니처 사용 시 주의할 점
type CountryNumberCodes = {
  [key: string]: number;
};

let countryNumberCodes: CountryNumberCodes = {};
// -> 타입 오류가 발생할 거 같지만 발생하지 않는다.

// 인덱스 시그니처 타입은 위 규칙을 위반하지만 않으면 모든 객체를 허용하는 타입이다.
// -> 아무런 프로퍼티가 없으면 규칙을 위반할 프로퍼티가 없으므로 오류가 발생하지 않는다.

// 반드시 있어야할 프로퍼티가 있는 경우
// - 아래에 적으면 된다.
type CountryNumberCodes = {
  [key: string]: number;
  Korea: number;
};

let countryNumberCodes: CountryNumberCodes = {};

// 변수의 이름을 바꾸는 경우
type CountryNumberCodes = {
  [key: string]: number;
  //   Korea: String; // 오류가 발생한다.
  Korea: number;
};

let countryNumberAndStringCodes: CountryNumberCodes = {
  Korea: 410,
};

// -> 인덱스 시그니처를 사용하는 어떤 객체 타입에서 추가적인 프로퍼티를 정의를 할 경우
// 추가적인 프로퍼티의 Value의 타입이 반드시 인덱스 시그니처의 Value의 타입과 일치하거나 호환해야한다.

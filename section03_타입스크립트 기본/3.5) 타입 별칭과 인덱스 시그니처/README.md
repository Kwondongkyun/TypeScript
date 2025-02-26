# 타입 별칭과 인덱스 시그니처

## 타입 별칭(Type Alias)

- 타입 별칭(Type Alias)은 특정 타입을 변수처럼 정의하여 재사용할 수 있도록 하는 문법이다.
- 객체 타입을 여러 번 선언해야 하는 경우 중복을 줄이고 가독성을 높이는 데 유용하다.

### 기본 객체 타입 선언

```tsx
let user: {
  id: number;
  name: string;
} = {
  id: 1,
  name: "kwon",
};
```
➡️ 위처럼 객체 타입을 정의하면, 프로퍼티가 많아질수록 작성해야 할 코드가 길어진다.

<br />

```tsx
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
  birth: "2001.01.01",
  bio: "안녕하세요",
  location: "경기도",
};

let user2: {
  id: number;
  name: string;
  nickname: string;
  birth: string;
  bio: string;
  location: string;
} = {
  id: 2,
  name: "park",
  nickname: "p",
  birth: "2001.10.01",
  bio: "안녕하세요",
  location: "서울",
};
```
➡️ `user1`과 `user2`와 같이 객체 타입을 직접 정의하면 여러 개의 객체를 선언할 때 중복 코드가 많아진다.

#

### 타입 별칭 사용하기

- 타입 별칭을 사용하면, 중복을 제거하고 객체 타입을 간결하게 정의할 수 있다.

  ```tsx
  type User = {
    id: number;
    name: string;
    nickname: string;
    birth: string;
    bio: string;
    location: string;
  };
  
  let user1: User = {
    id: 1,
    name: "kwon",
    nickname: "kdg",
    birth: "2001.01.01",
    bio: "안녕하세요",
    location: "경기도",
  };
  
  let user2: User = {
    id: 2,
    name: "park",
    nickname: "p",
    birth: "2001.10.01",
    bio: "안녕하세요",
    location: "경기도",
  };
  ```

#### 장점
- 중복 코드 제거
- 가독성 증가
- 유지보수 용이 (새로운 프로퍼티 추가 시 타입 별칭에만 추가)

#### 타입 별칭 사용 시 주의할 점
- 동일한 스코프 내에서 중복된 이름으로 타입 별칭을 선언하면 오류가 발생한다.
  ```tsx
  type User = {
    id: number;
  };
  
  type User = {  // 오류 발생
    name: string;
  };
  ```

#

### 타입스크립트 컴파일 결과

- 타입스크립트에서 `type`으로 정의된 타입(타입 별칭)은 컴파일 시 제거된다.

- 컴파일된 자바스크립트 코드:

  ```js
  let user1 = {
    id: 1,
    name: "kwon",
    nickname: "kdg",
    birth: "2001.09.26",
    bio: "안녕하세요",
    location: "성남시",
  };
  
  let user2 = {
    id: 2,
    name: "park",
    nickname: "p",
    birth: "2001.09.26",
    bio: "안녕하세요",
    location: "성남시",
  };
  ```

# 

## 인덱스 시그니처(Index Signature)

- 인덱스 시그니처(Index Signature)는 객체 타입을 유연하게 정의할 수 있도록 도와주는 문법이다.
- `Key`와 `Value`의 타입 규칙을 정의하여, 다양한 프로퍼티를 가진 객체의 타입을 선언할 때 유용합니다.

### 기본적인 인덱스 시그니처 사용법

```tsx
type CountryNumberCodes = {
  [key: string]: number;
};

let countryNumberCodes: CountryNumberCodes = {
  Korea: 410,
  UnitedStates: 840,
  UnitedKingdom: 826,
};
```
- `[key: string]`: 객체의 키(Key)는 문자열 타입, 모든 문자열 키를 허용
- `number`: 객체의 값(Value)은 숫자 타입

#

### ⭐인덱스 시그니처 사용 시 주의할 점⭐

#### 1. 빈 객체

- 아무 프로퍼티도 없는 객체를 선언하더라도 오류가 발생하지 않는다.

  ```tsx
  type CountryNumberCodes = {
    [key: string]: number;
  };
  
  let countryNumberCodes: CountryNumberCodes = {}; // 오류 없음
  ```

이유:
- 빈 객체는 규칙을 위반하지 않으므로 타입스크립트는 이를 허용한다.
- 인덱스 시그니처는 키-값 타입 규칙만 지키면 되기 때문이다.

<br />

#### 특정 프로퍼티를 반드시 포함해야 하는 경우

- 필수 프로퍼티를 추가로 명시할 수 있다.

  ```tsx
  type CountryNumberCodes = {
    [key: string]: number;
    Korea: number; // 필수 프로퍼티 명시
  };
  
  let countryNumberCodes: CountryNumberCodes = {
    Korea: 410,
    UnitedStates: 840,
  };
  ```

<br /> 

#### 인덱스 시그니처와 추가 프로퍼티

- 추가된 프로퍼티의 값 타입은 인덱스 시그니처의 값 타입과 호환되어야 한다.

  ```tsx
  type CountryNumberCodes = {
    [key: string]: number;
    Korea: number;
  };
  
  // 오류 발생: 값 타입이 호환되지 않음
  /*
  type CountryNumberCodes = {
    [key: string]: number;
    Korea: string; // 오류
  };
  */
  
  // 올바른 예
  let countryNumberCodes: CountryNumberCodes = {
    Korea: 410,
    // UnitedStates: "840", // 오류 발생 (string을 할당할 수 없음)
  };
  ```

<br />

### 타입 별칭과 인덱스 시그니처의 활용
- 예제1 : 다국어 지원 객체
  ```
  type Translations = {
    [key: string]: string;
  };
  
  let messages: Translations = {
    hello: "안녕하세요",
    goodbye: "안녕히 가세요",
    welcome: "환영합니다",
  };
  ```

- 예제2 : 사용자 역할 정의
  ```
  type UserRoles = {
    [userId: number]: "admin" | "user" | "guest";
  };
  
  let roles: UserRoles = {
    1: "admin",
    2: "user",
    3: "guest",
  };
  ```
  
# 

## 요약

1. **타입 별칭(Type Alias):**
   - 객체 타입을 재사용하고, 중복 코드를 제거할 때 유용.
   - 타입 정의가 길어질수록 코드 유지보수가 쉬워짐.

2. **인덱스 시그니처(Index Signature):**
   - 특정 패턴의 키-값을 가지는 객체를 정의하는 문법
   - 특정 프로퍼티를 추가하거나 필수 프로퍼티를 정의할 때도 사용.

3. **컴파일 시 타입 관련 코드는 제거**
   - 타입스크립트의 타입 선언은 런타임에는 영향을 미치지 않음.


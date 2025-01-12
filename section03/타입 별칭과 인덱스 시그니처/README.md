# 타입 별칭과 인덱스 시그니처

## 타입 별칭

타입 별칭(Type Alias)은 타입을 변수처럼 정의하여 재사용성을 높이고, 코드 중복을 줄이는 데 유용한 문법입니다.

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
➡️ 위처럼 객체 타입을 정의하면, 프로퍼티가 많아질수록 작성해야 할 코드가 길어집니다.

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
  location: "경기도",
};
```
➡️ 위처럼 `user1`과 `user2`에서 타입 정의 코드가 중복됩니다.

#

### 타입 별칭 사용하기

- 타입 별칭을 사용하면, 중복을 제거하고 객체 타입을 간결하게 정의할 수 있습니다.

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
- 새로운 프로퍼티를 추가해야 할 때 타입 별칭에만 추가하면 되므로 유지보수 용이

#### 주의사항
- 동일한 스코프 내에서 중복된 이름으로 타입 별칭을 선언하면 오류가 발생합니다.

#

### 타입스크립트 컴파일 결과

타입스크립트에서 `type`으로 정의된 타입은 컴파일 시 제거됩니다.

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

## 인덱스 시그니처

- 인덱스 시그니처(Index Signature)는 객체 타입을 유연하게 정의할 수 있도록 도와주는 문법입니다.
- `Key`와 `Value`의 타입 규칙을 정의하여, 다양한 프로퍼티를 가진 객체의 타입을 선언할 때 유용합니다.

### 기본 예시

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

#### 설명
- `[key: string]`: 객체의 키(Key)는 문자열 타입
- `number`: 객체의 값(Value)은 숫자 타입

#

### ⭐주의사항⭐

#### 빈 객체

- 아무 프로퍼티도 없는 객체를 선언하더라도 오류가 발생하지 않습니다.

  ```tsx
  let countryNumberCodes: CountryNumberCodes = {};
  ```

- 이유: 빈 객체는 규칙을 위반하지 않으므로 타입스크립트는 이를 허용합니다.

#### 특정 프로퍼티를 반드시 포함해야 하는 경우

- 필수 프로퍼티를 추가로 명시할 수 있습니다.

  ```tsx
  type CountryNumberCodes = {
    [key: string]: number;
    Korea: number; // 필수 프로퍼티
  };
  
  let countryNumberCodes: CountryNumberCodes = {
    Korea: 410,
    UnitedStates: 840,
  };
  ```
# 

### 인덱스 시그니처와 추가 프로퍼티

- 추가된 프로퍼티의 값 타입은 인덱스 시그니처의 값 타입과 호환되어야 합니다.

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
    UnitedStates: 840,
  };
  ```

<br />

### 활용 예시: 값 타입 유연하게 설정하기

```tsx
type FlexibleObject = {
  [key: string]: string | number;
  id: number; // 필수 프로퍼티
};

let example: FlexibleObject = {
  id: 1,
  name: "Example",
  age: 25,
};
```

# 

## 요약

1. **타입 별칭**
   - 객체 타입을 재사용하고, 중복 코드를 제거할 때 유용.
   - 타입 정의가 길어질수록 코드 유지보수가 쉬워짐.

2. **인덱스 시그니처**
   - Key와 Value의 타입 규칙을 지정하여 유연한 객체 타입 선언 가능.
   - 특정 프로퍼티를 추가하거나 필수 프로퍼티를 정의할 때도 사용.

3. **컴파일 시 타입 관련 코드는 제거**
   - 타입스크립트의 타입 선언은 런타임에는 영향을 미치지 않음.


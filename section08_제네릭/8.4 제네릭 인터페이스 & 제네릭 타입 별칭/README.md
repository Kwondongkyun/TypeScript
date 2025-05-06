# TypeScript 제네릭 인터페이스 & 타입 별칭 완전 정복

TypeScript의 제네릭(Generic)은 함수뿐만 아니라 **인터페이스와 타입 별칭**에도 사용할 수 있습니다. 이 포스트에서는 제네릭 인터페이스의 기본 사용법부터, 인덱스 시그니처, 타입 별칭, 그리고 실전 예제까지 단계별로 정리해볼게요.

---

## 제네릭 인터페이스란?

- 제네릭 인터페이스는 **타입을 나중에 외부에서 주입**받아 더 유연하게 재사용 가능한 인터페이스입니다.
- 제네릭 함수와 마찬가지로 타입으로 정의할 때 `type` 변수에 할당할 타입을 꺾쇠(`<>`) 안에 명시해서 사용합니다.


### 기본 예제: Key-Value 쌍을 표현

```tsx
interface KeyPair<K, V> {
  key: K;
  value: V;
}
```
* `K`, `V`는 타입 변수로, `key`, `value` 각각의 타입을 유동적으로 설정할 수 있습니다.

<br />

### 타입 생략 시 에러

```tsx
let keyPair: KeyPair = {}; // 오류 발생
```

> 제네릭 인터페이스는 타입을 사용할 때 반드시 타입 인자를 명시해야 합니다.

<br />

### 해결 방법

```tsx
let keyPair: KeyPair<string, number> = {
  key: "key",
  value: 0,
};
```
* 타입 변수에 타입을 직접 할당해줘야합니다. `(KeyPair<string, number>)`

---

## 제네릭 인터페이스에서의 타입 변수 명칭들

* 타입 파라미터
* 제네릭 타입 변수
* 제네릭 타입 파라미터

  ➡️ 모두 같은 의미이며, 문맥에 따라 혼용됩니다.

---

## 인덱스 시그니처 + 제네릭

- 인덱스 시그니처는 객체의 키와 값의 타입만 지정하면, 어떤 프로퍼티든 허용하는 유연한 구조입니다.

### 기본 형태

```tsx
interface NumberMap {
  [key: string]: number;
}
```

<br />

### 제네릭 적용

```tsx
interface Map<V> {
  [key: string]: V;
}
```

* `V` 타입 변수 덕분에 `value`의 타입을 원하는 대로 지정할 수 있습니다.

<br />

### 사용 예시

```tsx
let stringMap: Map<string> = {
  key: "value",
};

let booleanMap: Map<boolean> = {
  key: true,
};
```

---

## 제네릭 타입 별칭

* 인터페이스처럼 타입 별칭(type alias)도 제네릭으로 만들 수 있습니다.

### 타입 별칭으로 동일한 구조 구현

```tsx
// 제네릭 타입별칭 생성
type Map2<V> = {
  [key: string]: V;
};

// `Map2` 타입을 갖는 변수 생성
let stringMap2: Map2<string> = {
  key: "hello",
};
```

* 타입 별칭도 제네릭을 사용할 때 **반드시 타입 인자를 제공**해야 합니다.

---

## 실전 예제: 유저 관리 프로그램에 적용해보기

> 학생과 개발자를 구분하고, 각각에 맞는 기능을 구현하는 시나리오

### 1. 유저 프로필 타입 정의

```tsx
interface Student {
  type: "student";
  school: string;
}

interface Developer {
  type: "developer";
  skill: string;
}
```

* `type` 프로퍼티는 리터럴 타입 → 서로소 유니온 타입을 구성할 수 있음

<br />

### 2. 유저 타입 및 객체 생성

```tsx
interface User {
  name: string;
  profile: Student | Developer;
}

const developerUser: User = {
  name: "kwon",
  profile: {
    type: "developer",
    skill: "TypeScript",
  },
};

const studentUser: User = {
  name: "kim",
  profile: {
    type: "student",
    school: "대학교",
  },
};
```

<br />

### 3. 특정 역할 함수 구현: 학생만 등교 가능

```tsx
function goToSchool(user: User) {
  if (user.profile.type !== "student") {
    console.log("잘 못 오셨습니다.");
    return;
  }
  console.log(`${user.profile.school}로 등교 완료`);
}
```

<img width="350" alt="타입 가드로 타입 좁히기" src="https://github.com/user-attachments/assets/a1ce8e59-a0ef-409a-ba16-a7c1660e76a7" />

* `type` 리터럴 덕분에 **타입 가드**를 통해 `Student`로 좁힐 수 있음

<br />

### 문제점

* 유저 타입이 늘어나면 타입 가드도 반복적으로 작성해야 함
* 함수마다 조건문으로 `type` 좁히기 → 번거로움

---

## 해결책: 제네릭 인터페이스로 리팩터링

```tsx
interface User<T> {
  name: string;
  profile: T;
}
```

### 함수 정의 시 타입 명시로 해결

```tsx
function goToSchool(user: User<Student>) {
  console.log(`${user.profile.school}로 등교 완료`);
}
```

<br />

### 타입 명시로 객체 생성

```tsx
const developerUser: User<Developer> = {
  name: "kwon",
  profile: {
    type: "developer",
    skill: "TypeScript",
  },
};

const studentUser: User<Student> = {
  name: "kim",
  profile: {
    type: "student",
    school: "대학교",
  },
};
```

---

## 🧠 마무리 요약

| 항목             | 설명                                    |
| -------------- | ------------------------------------- |
| 제네릭 인터페이스      | 타입 인자를 꺾쇠(`<T>`)로 받아 유연하게 타입 정의       |
| 타입 별칭          | `type`으로 제네릭 구조 생성 가능                 |
| 인덱스 시그니처 + 제네릭 | `[key: string]: V` 형태로 다양한 값을 받을 수 있음 |
| 실전 활용          | 조건문 타입 가드 대신 제네릭으로 함수마다 타입을 고정하면 편리함  |
| 핵심 장점          | 재사용성 + 타입 안전성 + 코드 간결성                |

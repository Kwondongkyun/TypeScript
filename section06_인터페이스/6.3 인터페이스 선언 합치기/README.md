# 인터페이스 선언 합치기 (Declaration Merging)

## 개요

TypeScript에서 `interface`는 **동일한 이름으로 여러 번 선언**할 수 있으며, 이 경우 **자동으로 하나의 인터페이스로 병합**됩니다. 이를 **선언 합침(declaration merging)** 이라 부릅니다. 이는 `type` 별칭과의 큰 차이점 중 하나입니다.

---

## 타입 별칭과의 차이점

### `type`은 중복 선언 불가

```tsx
type Person = {
  name: string;
};

type Person = { // 오류 발생: 중복 선언 불가
  age: number;
};
```

<br />

### `interface`는 중복 선언 가능

```tsx
interface Person {
  name: string;
}

interface Person {
  age: number;
}
```

```tsx
const person: Person = {
  name: "Alice",
  age: 30,
};
```

➡️ 위 두 인터페이스는 **자동으로 합쳐져** `name`과 `age`를 모두 가진 `Person` 타입으로 사용 가능하게 됩니다.

---

## 선언 합침의 규칙

### ✅ 올바른 선언 합침 (서로 다른 프로퍼티)

```tsx
interface User {
  id: number;
}

interface User {
  nickname: string;
}

// 병합 결과:
const user: User = {
  id: 1,
  nickname: "kwon",
};
```

<br />

### ❌ 잘못된 선언 합침 (동일한 프로퍼티 이름, 다른 타입)

```tsx
interface Person {
  name: string;
}

interface Person {
  name: number; // 오류 발생
}
```

- **동일한 프로퍼티를 정의할 때는 타입이 반드시 동일해야 하며**, 리터럴 타입이거나 서브타입이어도 허용되지 않습니다.

---

## 함수 시그니처 병합

선언 합침 시 함수 시그니처는 **오버로드 형태로 병합**됩니다:

```tsx
interface Api {
  get(path: string): string;
}

interface Api {
  get(path: string, timeout: number): string;
}
```

- 위 예제는 다음과 같은 오버로드 형태로 병합:

  ```tsx
  interface Api {
    get(path: string): string;
    get(path: string, timeout: number): string;
  }
  ```

---

## 실제 활용 사례: **모듈 보강(Module Augmentation)**

선언 합침은 주로 **외부 라이브러리의 타입 정의 보완**에 사용됩니다.

예: `express`의 `Request` 객체에 커스텀 프로퍼티 추가

```tsx
// types/express/index.d.ts
import "express";

declare module "express" {
  interface Request {
    user?: {
      id: string;
      name: string;
    };
  }
}
```

➡️ 선언 합침을 이용해 기존 라이브러리의 타입을 **직접 수정하지 않고도** 확장 가능.

---

## 요약

| 구분                 | 인터페이스 (`interface`) | 타입 별칭 (`type`) |
|----------------------|---------------------------|---------------------|
| 중복 선언            | 가능 (자동 병합됨)        | 불가능 (오류 발생)  |
| 오버로드 지원        | 함수 시그니처 병합 가능    | 지원 안 함           |
| 사용 용도            | 객체 타입 확장, 모듈 보강  | 유니온/인터섹션 등 다양한 조합 |

---

## 결론

- 인터페이스는 선언을 여러 번 나눠서 작성해도 자동으로 병합되는 **유연한 구조**를 가진다.
- 특히 **라이브러리 보강**과 **함수 오버로딩**에서 자주 쓰이므로 실무에서 매우 유용하다.
- 단, **동일한 프로퍼티를 서로 다른 타입으로 선언하면 오류**가 발생하니 주의해야 한다.

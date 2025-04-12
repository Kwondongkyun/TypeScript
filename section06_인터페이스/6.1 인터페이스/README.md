# 인터페이스

: 타입별칭(`type`)과 유사하게 타입의 이름을 지어주는 문법이다.

```tsx
interface A {
  a: string;
  b: number;
}
```

## 인터페이스란?

- 상호 간의 **약속된 규칙**이라는 의미를 가진다.
- 객체의 **구조를 정의**하는 데 특화된 문법으로, 타입별칭과 달리 다양한 기능(상속, 병합 등)을 제공한다.

 ➡️ **객체 타입을 정의할 때 더 직관적이고 유용하게 사용할 수 있다.**

---

## 인터페이스 기본 사용법

- `name`과 `age` 프로퍼티를 갖는 `Person`이라는 객체 타입 정의:

  ```tsx
  interface Person {
    name: string;
    age: number;
  }
  ```
  
<br />

- `Person` 타입을 갖는 변수 선언:

  ```tsx
  const person: Person = {
    name: "kwon",
    age: 25,
  };
  ```

<br />

- **인터페이스도 타입별칭처럼 `:` 타입 주석을 통해 사용할 수 있다.**

---

## 선택적 프로퍼티(Optional Property)

- 특정 프로퍼티가 있어도 되고 없어도 되는 경우 `?` 사용:

  ```tsx
  interface Person {
    name: string;
    age?: number;
  }
  ```

---

## 읽기 전용 프로퍼티(Readonly Property)

- 프로퍼티에 `readonly`를 붙이면 수정이 불가능한 상수로 간주됨:

  ```tsx
  interface Person {
    readonly name: string;
    age?: number;
  }
  ```
  
  ```tsx
  const p: Person = { name: "kwon", age: 25 };
  p.name = "kim"; // 오류 발생!
  ```

---

## 인터페이스에서 메서드 정의

### 함수 타입 표현식
```tsx
interface Person {
  name: string;
  sayHi: () => void;
}
```

<br />

### 호출 시그니처(Signature Syntax)
```tsx
interface Person {
  name: string;
  sayHi(): void;
}
```

```tsx
const person: Person = {
  name: "kwon",
  sayHi: function () {
    console.log("Hi");
  },
};
```

---

## 함수 오버로딩 구현 (메서드 시그니처 활용)

```tsx
interface Person {
  readonly name: string;
  age?: number;
  sayHi(): void;
  sayHi(a: number, b: number): void;
}

const person: Person = {
  name: "kwon",
  sayHi: function () {
    console.log("Hi");
  },
};
```

- **오버로딩(여러 개의 시그니처)** 은 함수 타입 표현식(`sayHi: () => void`)으로는 불가능하며, 반드시 호출 시그니처 방식으로 정의해야 함

---

## 인터페이스와 타입 별칭의 차이점

| 구분 | 인터페이스 (`interface`) | 타입 별칭 (`type`) |
|------|---------------------------|---------------------|
| 목적 | 객체 타입 정의에 특화 | 다양한 타입 정의 가능 |
| 확장 | `extends`로 상속 가능 | `&` 연산자로 교차 타입 생성 |
| 병합 | 선언 병합 가능 | 불가능 (중복 선언 오류) |
| 유니온/인터섹션 | 불가능 | 가능 |

### 예시: 유니온 타입과 인터섹션 타입은 `type`만 가능

```tsx
type Type1 = number | string | Person;
type Type2 = number & string;

const mixed: Person | number = {
  name: "kwon",
  sayHi: function () {
    console.log("Hi");
  },
};
```

---

**결론**:
- 객체 타입을 정의할 땐 `interface`를,
- 다양한 타입 조합(유니온, 인터섹션 등)이 필요할 땐 `type`을 적절히 사용하면 된다.


# 인터페이스 확장 (Inheritance / `extends`)

## 개요

`interface`는 다른 인터페이스를 `extends` 키워드를 통해 **상속(확장)** 할 수 있습니다. 이는 **공통 속성 재사용**과 **유지보수성 향상**에 매우 유용합니다.

---

## 중복 정의의 문제점

### 문제 상황

- 여러 타입에 동일한 속성(`name`, `age`)을 반복 정의하는 경우:

  ```tsx
  interface Animal {
    name: string;
    age: number;
  }
  
  interface Dog {
    name: string;
    age: number;
    isBark: boolean;
  }
  
  interface Cat {
    name: string;
    age: number;
    isScratch: boolean;
  }
  
  interface Chicken {
    name: string;
    age: number;
    isFly: boolean;
  }
  ```

  ➡️ `name`, `age`가 반복되어 **중복 코드가 많고**, 수정 시 **여러 곳을 동시에 변경해야 하는 문제** 발생<br />
  ➡️ 유지보수 Hard

---

## 상속(`extends`)으로 구조 개선

### 공통 속성을 상위 타입으로 추출

- `extends`를 사용해 **공통 속성을 상위 인터페이스로 추출**
- 서브 인터페이스는 공통 속성을 상속받고, 고유한 속성만 정의

  ```tsx
  interface Animal {
    name: string;
    color: string;
  }
  
  interface Dog extends Animal {
    isBark: boolean;
  }
  
  interface Cat extends Animal {
    isScratch: boolean;
  }
  
  interface Chicken extends Animal {
    isFly: boolean;
  }
  ```

<br />

### 사용 예시

```tsx
const dog: Dog = {
  name: "콩이",
  color: "white",
  isBark: true,
};
```

➡️ 중복 제거, 구조 개선, 유지보수 편의성 확보

---

## 상속된 프로퍼티 재정의 (오버라이딩)

- 하위 인터페이스에서 **상위 속성의 타입을 더 구체화**할 수 있음  
- 단, **상위 타입의 서브 타입이어야만 가능**

  ### ✅ 가능 (string → string 리터럴)
  
  ```tsx
  interface Animal {
    name: string;
    color: string;
  }
  
  interface Dog extends Animal {
    name: "hello"; // 더 좁은 범위로 재정의 (리터럴)
    isBark: boolean;
  }
  ```
  
  ```tsx
  const dog: Dog = {
    name: "hello",
    color: "white",
    isBark: true,
  };
  ```

  <br />

  ### ❌ 오류 (string → number)
  
  ```tsx
  interface Dog extends Animal {
    name: number; // 오류: 상위 타입보다 좁지 않음
    isBark: boolean;
  }
  ```

  ➡️ 재정의는 반드시 **타입이 호환되는 범위 내에서만** 가능

---

## 타입 별칭도 확장 가능

인터페이스는 객체 타입인 `type` 별칭도 `extends`로 확장할 수 있음

```tsx
type Animal = {
  name: string;
  color: string;
};

interface Dog extends Animal {
  isBark: boolean;
}
```

### 주의

- `type`이 객체 타입이 아닌 경우(`string | number` 등), 확장 불가

---

## 다중 상속 (Multiple Inheritance)

- 여러 인터페이스를 동시에 상속받을 수 있음  
  ➡️ 모든 속성이 하나의 타입으로 결합됨

  ```tsx
  interface A {
    a: string;
  }
  
  interface B {
    b: number;
  }
  
  interface C extends A, B {
    c: boolean;
  }
  
  const obj: C = {
    a: "hi",
    b: 123,
    c: true,
  };
  ```

---

## 요약 정리

| 특징             | 설명 |
|------------------|------|
| 공통 속성 재사용 | 중복 제거, 상위 타입으로 추출 |
| 유지보수 편리    | 상위 속성 변경 시 하위에 자동 반영 |
| 타입 재정의      | 하위에서 상위 타입을 더 좁게 재정의 가능 (단, 호환성 필요) |
| 다중 확장        | 여러 인터페이스를 동시에 상속 가능 |
| 타입 별칭 확장    | 객체 타입인 `type`도 확장 가능 (`interface`는 객체만 상속 가능) |

---

## 결론

- 인터페이스 확장은 **객체 타입 구조를 체계적으로 설계**할 수 있는 강력한 도구이다.
- 공통 속성은 상위 인터페이스로 분리하고, 하위 인터페이스는 필요한 속성만 추가함으로써 **가독성과 유지보수성**을 모두 확보할 수 있다.

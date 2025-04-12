# 인터페이스 확장 (상속)

## 문제 상황

- 동일한 속성(`name`, `age`)을 여러 타입에 중복 정의해야 하는 비효율적인 구조:

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

  ➡️ 유지보수가 어렵고, 중복 코드가 많아짐

# 

### 해결: `extends` 사용하여 상속 구조로 개선

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
  
  const dog: Dog = {
    name: "콩이",
    color: "white",
    isBark: true,
  };
  ```

---

## 상속받은 프로퍼티 재정의 (오버라이딩)

- 상속받은 속성의 타입을 **보다 구체적인 타입으로 재정의 가능**
- 단, **기존 타입의 서브 타입**이어야 함

  ```tsx
  interface Animal {
    name: string;
    color: string;
  }
  
  interface Dog extends Animal {
    name: "hello"; // string → 리터럴 타입으로 재정의 (가능)
    isBark: boolean;
  }
  ```
  
  ```tsx
  const dog: Dog = {
    name: "hello", // ✅
    color: "brown",
    isBark: true,
  };
  ```
  
  ```tsx
  interface Dog extends Animal {
    name: number; // ❌ 오류! string → number는 상위 타입이 아님
    isBark: boolean;
  }
  ```

---

## 타입 별칭도 확장 가능

- 인터페이스는 객체 타입이라면 **타입 별칭도 확장 가능**:

  ```tsx
  type Animal = {
    name: string;
    color: string;
  };
  
  interface Dog extends Animal {
    isBark: boolean;
  }
  ```

 ➡️ 단, **함수나 유니온 타입**은 확장 불가 (`interface`는 객체 타입만 상속 가능)

---

## 다중 확장 (Multiple Inheritance)

- 여러 인터페이스를 동시에 확장 가능
- 각 인터페이스의 속성들이 모두 포함됨

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
    a: "hello",
    b: 42,
    c: true,
  };
  ```

---

## 정리

| 특징 | 설명 |
|------|------|
| 코드 중복 제거 | 공통 속성을 상위 타입으로 분리하여 재사용성 증가 |
| 유지보수 용이 | 상위 인터페이스 변경 시, 하위 인터페이스 자동 반영 |
| 재정의 가능 | 하위 인터페이스에서 상위 속성을 구체적으로 재정의 가능 (단, 서브 타입일 것) |
| 다중 확장 지원 | 여러 인터페이스를 동시에 상속 가능 |
| 타입 별칭 확장 | 타입 별칭이 객체 타입이면 확장 가능 |

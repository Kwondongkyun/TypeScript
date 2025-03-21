# 함수 타입 표현식과 호출 시그니처

## 함수 타입 표현식(Function Type Expression)

### 타입 별칭 사용

- 타입 별칭을 이용해 함수의 타입을 정의할 수 있다.

  ```tsx
  type Operation = (a: number, b: number) => number;
  
  const add: Operation = (a, b) => a + b;
  const sub: Operation = (a, b) => a - b;
  const multiply: Operation = (a, b) => a * b;
  const divide: Operation = (a, b) => a / b;
  ```

<br />

### 표현식만으로 타입 정의

```tsx
const add: (a: number, b: number) => number = (a, b) => a + b;
```

<br />

### 주의사항

- 함수 타입을 정의할 때 매개변수 개수와 타입을 정확히 맞춰야 한다.

# 

## 호출 시그니처(콜 시그니처)

- 함수의 타입을 별도로 정의하는 문법이다.

```tsx
type Operation2 = {
  (a: number, b: number): number;
};

const add2: Operation2 = (a, b) => a + b;
```

# 

## 하이브리드 타입

- 호출 시그니처를 사용할 때 객체에 프로퍼티를 추가할 수 있다.

  ```tsx
  type Operation2 = {
    (a: number, b: number): number;
    name: string;
  };
  
  const add2: Operation2 = (a, b) => a + b;
  add2.name = "Addition";
  
  console.log(add2(1, 3));
  console.log(add2.name);
  ```


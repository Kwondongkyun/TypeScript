# 타입스크립트의 타입 간 호환성

## 기본 타입 간의 호환성

- 기본 타입 간의 호환성은 특정 타입을 다른 타입으로 취급할 수 있는지를 판단하는 것이다.

  ```tsx
  // 기본 타입 간의 호환성
  let num1: number = 10;
  let num2: 10 = 10;
  
  num1 = num2; // 업 캐스팅으로 가능
  ```

- 이 예제에서 `num2`는 리터럴 타입 10을 가지지만, `num1`은 일반 숫자 타입이다.
- `num2`를 `num1`에 할당하는 것은 가능하며, 이는 `num2`가 `num1`의 슈퍼타입으로 간주되기 때문이다.

---

## 객체 타입 간의 호환성

- 객체 타입 간의 호환성은 객체의 프로퍼티에 기반하여 결정된다.

#### 코드 예시
- 객체 타입이 서로 슈퍼타입-서브타입 관계를 갖는 예시

  ```tsx
  // 객체 타입 생성
  type Animal = {
    name: string;
    color: string;
  };
  
  type Dog = {
    name: string;
    color: string;
    breed: string;
  };
  
  // 객체 타입을 갖는 변수 생성
  let animal: Animal = {
    name: "기린",
    color: "yellow",
  };
  
  let dog: Dog = {
    name: "돌돌이",
    color: "brown",
    breed: "진도",
  };
  
  // 변수 집어넣기
  animal = dog; // 업 캐스팅 가능
  dog = animal; // 오류 발생
  ```

  - 이 경우, `Dog` 타입을 `Animal` 타입으로 할당하는 것은 가능하지만, 반대로는 불가능하다.
  - 이는 `Dog`가 `Animal`의 서브타입이기 때문이다.

# 

### 객체 간의 슈퍼-서브 타입 관계

- 객체 타입들은 기본 타입처럼 슈퍼타입-서브타입 관계를 가진다.
- 관계는 프로퍼티의 수와 종류에 따라 결정되며, 추가 프로퍼티가 없는 조건이 더 적은 타입이 슈퍼타입이 된다.

#### 추가 예시

```tsx
type Book = {
  name: string;
  price: number;
};

type ProgrammingBook = {
  name: string;
  price: number;
  skill: string;
};

let book: Book;
let programmingBook: ProgrammingBook = {
  name: "책",
  price: 33000,
  skill: "reactjs",
};

book = programmingBook; // 업 캐스팅 가능
```

---

## 초과 프로퍼티 검사

- 타입스크립트는 변수를 초기화할 때 객체 리터럴을 사용하면 초과 프로퍼티 검사를 수행한다. 이때 정의되지 않은 프로퍼티를 포함하면 오류가 발생한다.

  ```tsx
  let book2: Book = {
    name: "책",
    price: 33000,
    // skill: "reactjs", // 오류 발생
  };
  ```

  ⭐ 이 경우, `Book` 타입에 정의된 프로퍼티만 사용해야 한다.

### 해결 방안

1. **주석 처리 또는 삭제하기**

   - 정의된 프로퍼티만 사용하여 오류를 피할 수 있다.

     ```tsx
     let book2: Book = {
       name: "책",
       price: 33000,
       // skill: "reactjs", // 오류 발생 방지
     };
     ```

2. **객체 리터럴로 초기화하지 않기**

   - 변수에 저장한 후 사용하면 오류를 피할 수 있다.

     ```tsx
     let programmingBook: ProgrammingBook = {
       name: "책",
       price: 33000,
       skill: "reactjs",
     };
  
     let book3: Book = programmingBook; // 업 캐스팅
     ```

3. **함수의 인수로 서브 타입 객체 전달하기**

   - 객체 리터럴로 전달할 경우 초과 프로퍼티 검사를 수행한다. 변수를 저장한 후 전달하면 안전하다.

     ```tsx
     function func(book: Book) {}
  
     func({
       name: "책",
       price: 33000,
       // skill: "reactjs", // 주석 처리
     });
  
     // 변수에 저장한 후 전달하기
     func(programmingBook);
     ```
---

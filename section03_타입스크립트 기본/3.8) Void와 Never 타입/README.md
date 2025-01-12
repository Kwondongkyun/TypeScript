# Void와 Never 타입

TypeScript에는 JavaScript에는 없는 독특한 타입이 존재하는데, 그중 `void`와 `never`는 함수의 반환값이나 변수의 타입 정의에서 중요한 역할을 한다.

#  

## void 타입

- `void`는 "공허함"을 의미하며, **아무것도 없음을 나타내는 타입**이다.
- 주로 **아무것도 반환하지 않는 함수**나 특정한 목적으로 사용된다.

<br />

### 함수의 반환값 타입 정의

#### 1. 값을 반환하는 함수
- 함수가 값을 반환할 경우, 반환값의 타입을 명시해야 한다.

  ```tsx
  function func1(): string {
    return "hello";
  }
  ```

#### 2. 값을 반환하지 않는 함수
- **아무것도 반환하지 않는 함수**의 반환 타입은 `void`로 정의한다.

  ```tsx
  function func2(): void {
    console.log("hello");
  }
  ```

<br />

### 변수의 타입 정의

- `void` 타입으로 선언된 변수는 기본적으로 **값을 담을 수 없다.**

  ```tsx
  let a: void;
  a = 1; // 오류 발생
  a = undefined; // 유일하게 허용되는 값
  ```

#### `strictNullChecks` 옵션 사용 시 동작
- `strictNullChecks`를 비활성화하면(`"strictNullChecks": false`), 예외적으로 `null` 값을 할당할 수 있다.

  `tsconfig.json`
  ```json
  {
    "compilerOptions": {
      "strictNullChecks": false
    }
  }
  ```

  ```tsx
  let a: void;
  a = null; // 가능
  ```

<br />

### void 값을 사용하는 이유

- 반환값을 명시적으로 나타냄으로써, 코드의 의도를 더 분명히 한다.
- 예를 들어, 아무것도 반환하지 않는 함수의 반환 타입에 `undefined`이나 `never`를 지정할 경우 오류가 발생할 수 있다.
  
  ```tsx
  function func2(): undefined {
    console.log("hello");
    // return undefined; // 명시적으로 반환해야 함
  }
  ```

  ➡️ TypeScript의 최신 버전(5.1.0 이상)에서는 이러한 제한이 완화되었다.

---

## never 타입

- `never`는 **존재하지 않는 값**, 즉 **불가능한 타입**을 나타낸다.
- 반환값이 **정상적으로 끝날 수 없는 함수**나 **어떤 값도 담을 수 없는 변수**를 정의할 때 사용된다.

<br />

### 반환값 타입으로 사용

#### 1. 무한 루프를 도는 함수
- 무한 루프를 실행하는 함수는 반환값이 없으므로 `never`로 정의한다.

  ```tsx
  function infiniteLoop(): never {
    while (true) {}
  }
  ```

<br />

#### 2. 오류를 던지는 함수
- 함수가 실행 중 에러를 던지고 종료되지 않을 경우 반환 타입을 `never`로 설정한다.

  ```tsx
  function throwError(): never {
    throw new Error("Something went wrong!");
  }
  ```

# 

### 변수의 타입 정의

- `never` 타입의 변수는 **어떤 값도 할당할 수 없다.**

  ```tsx
  let a: never;
  a = 1; // 오류 발생
  a = undefined; // 오류 발생
  a = null; // 오류 발생
  ```

- `strictNullChecks` 옵션을 비활성화해도 `null`이나 `undefined`를 할당할 수 없다.
- 심지어 `any` 타입의 값도 할당할 수 없다.

  ```tsx
  let anyVar: any;
  a = anyVar; // 오류 발생
  ```

# 

### void와 never의 차이점

| **특징**           | **void**                                  | **never**                                      |
|---------------------|-------------------------------------------|-----------------------------------------------|
| **값을 담을 수 있는지** | `undefined` (또는 `null` - 조건부) 가능     | 어떤 값도 담을 수 없음                        |
| **함수 반환**       | 반환 값이 없는 함수                       | 반환할 수 없거나 끝날 수 없는 함수             |
| **주요 목적**       | "아무것도 없음"을 명시                    | "절대 발생할 수 없는 상태"를 명시             |

# 

### 정리

- `void`는 반환값이 없는 함수나 값이 없는 상태를 나타내며, 제한적으로 `undefined` 값을 담을 수 있다.
- `never`는 종료되지 않거나 불가능한 상태를 나타내며, 어떤 값도 할당할 수 없는 엄격한 타입이다.
- 코드 작성 시 두 타입을 적절히 활용하면, 코드의 의도와 안전성을 더욱 명확히 표현할 수 있다.

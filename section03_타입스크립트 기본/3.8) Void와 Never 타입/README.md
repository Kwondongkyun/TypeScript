# TypeScript의 Void와 Never 타입

TypeScript에는 JavaScript에는 없는 독특한 타입이 존재하는데, 그중 `void`와 `never`는 함수의 반환값이나 변수의 타입 정의에서 중요한 역할을 한다.

#  

## 1. void 타입

- `void`는 "공허함"을 의미하며, **아무것도 없음을 나타내는 타입**이다.
- 주로 **아무것도 반환하지 않는 함수**나 특정한 목적으로 사용된다.

<br />

### 1.1 함수의 반환값 타입 정의

#### 값을 반환하는 함수
- 함수가 값(문자열)을 반환할 경우, 반환값의 타입을 명시해야 한다.

  ```ts
  function func1(): string {    // 반환값의 타입 명시
    return "hello";
  }
  ```

#### 값을 반환하지 않는 함수
- **아무것도 반환하지 않는 함수**의 반환 타입은 `void`로 정의한다.

  ```ts
  function func2(): void {
    console.log("hello");
  }
  ```

<br />

### 1.2 변수의 타입 정의

- `void` 타입으로 선언된 변수는 기본적으로 **어떠한 값도 담을 수 없다.**

  ```ts
  let a: void;
  a = 1; // 에러 발생
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

  ```ts
  let a: void;
  a = null; // 가능
  ```

<br />

### 1.3 void 값을 사용하는 이유 (`undefined`, `null` 대신)

**`undefined`으로 반환할 경우:** 
- 타입스크립트 버전이 업데이트되면서 아무것도 반환하지 않는 함수의 반환값 타입으로 `undefined`를 명시해도 문제가 발생하지 않도록 수정되었다.
  ```ts
  function func2(): undefined {
    console.log("hello");
    // return undefined; // 명시적으로 반환해야 함
  }
  ```

**`null`로 반환할 경우:**
- 아래와 같이 오류가 발생합니다:
  
  ```ts
  function func2(): null {
    console.log("hello");
    return null; // null을 반환해야 합니다.
  }
  ```

---

## 2. never 타입

- `never`는 **존재하지 않는 값**, 즉 **불가능한 타입**을 나타낸다.
- 반환값이 **정상적으로 끝날 수 없는 함수**나 **어떤 값도 담을 수 없는 변수**를 정의할 때 사용된다.

<br />

### 2.1 무한 루프를 도는 함수
- 무한 루프를 실행하는 함수는 반환값이 없으므로 `never`로 정의한다.

  ```ts
  function infiniteLoop() {
    while (true) {}
  }
  ```
#### 반환값 타입 정의:
- `void`: 함수가 정상적으로 종료되지는 않지만, 반환문이 없어 void로 사용할 수 있습니다.
- `never`: 이 함수가 정상적으로 종료될 수 없기 때문에, 반환한다는 것 자체가 모순이며, 이 경우 never를 사용합니다.

  ```ts
  function func3(): never {
    while (true) {}
  }
  ```

<br />

### 2.2 에러를 던지는 함수
- 함수가 실행 중 에러를 던지고 종료되지 않을 경우 반환 타입을 `never`로 설정한다.

  ```ts
  function throwError(): never {
    throw new Error("Something went wrong!");
  }
  ```

# 

## 3. 변수의 타입으로 정의하기
- `never` 타입도 변수의 타입으로 정의할 수 있습니다:
  ```ts
  let a: never;
  ```

- `never` 타입의 변수는 **어떤 값도 할당할 수 없다.**

  ```ts
  let a: never;
  a = 1; // 오류 발생
  a = undefined; // 오류 발생
  a = null; // 오류 발생
  ```

- `strictNullChecks` 옵션을 비활성화해도 `null`이나 `undefined`를 할당할 수 없다.
  ```ts
  a = undefined; // 에러
  a = null; // 에러
  ```
  
- `any` 타입의 값도 할당할 수 없다.

  ```ts
  let anyVar: any;
  a = anyVar; // 오류 발생
  ```

#### ⭐결론⭐: never 타입은 어떤 값도 저장할 수 없는 변수를 정의할 때 유용하다.

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

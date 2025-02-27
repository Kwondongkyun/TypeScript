# TypeScript 타입 계층도 정리
![타입계층도](https://github.com/user-attachments/assets/a1f804c8-22ca-4c7e-ab78-44b518f4c963)

## 1. `unknown` 타입

- 타입 계층도의 최상단에 위치함.
- TypeScript의 모든 타입을 포함하는 **최상위(super) 타입**.
- `unknown` 타입의 변수에는 **모든 타입의 값을 할당 가능**(업캐스팅).
- 하지만 `unknown` 타입의 변수는 **어떤 특정 타입의 변수에도 할당할 수 없음**(다운캐스팅 불가능).

### ✅ 코드 예시

- 업 캐스팅
  ```tsx
  let a: unknown = 1;
  let b: unknown = "hello";
  let c: unknown = true;
  let d: unknown = null;
  let e: unknown = undefined;
  ```

- 다운 캐스팅
  ```tsx
  let unknownVar: unknown;
  
  let num: number = unknownVar; // ❌ 오류 발생
  let str: string = unknownVar; // ❌ 오류 발생
  let bool: boolean = unknownVar; // ❌ 오류 발생
  ```

---

## 2. `never` 타입

- 타입 계층도의 **가장 아래에 위치**함.
- **모든 타입의 서브 타입**이며, **공집합(값이 없음)** 을 의미.
- 반환값을 가질 수 없는 함수에 사용됨.
- 모든 타입에 업캐스팅 가능하지만, `never` 타입의 변수에는 **어떤 값도 할당할 수 없음**(다운캐스팅 불가능).<br />
  ➡️ 어떤 값도 저장되어서는 안되는 변수의 타입으로 활용하면 좋다.
  
### ✅ 코드 예시

- 함수에서 반환하는 것 자체가 말이 안될 떄 반환 타입으로 사용
  ```tsx
  function neverFunc(): never {
    while (true) {}
  }
  ```

- 업 캐스팅
  ```tsx
  let num: number = neverFunc();
  let str: string = neverFunc();
  let bool: boolean = neverFunc();
  ```

---

## 3. `void` 타입

- 반환값이 없는 함수에서 사용됨.
- `undefined` 타입의 슈퍼 타입.
- 함수가 명시적으로 값을 반환하지 않는 경우 `void`를 반환 타입으로 설정 가능.
- `void` 타입의 변수에는 `undefined`만 할당 가능.

### ✅ 코드 예시

- 반환값이 없는 함수
  ```tsx
  function voidFunc(): void {
    console.log("hi");
  }
  ```

- `void` 타입의 변수에 `undefined`의 값(업 캐스팅)
  ```tsx
  let voidVar: void = undefined;
  ```

- `void` 타입 함수에서 `undefined` 반환
  ```tsx
  function voidFunc(): void {
    console.log("hi");
    return undefined;
  }
  ```

---

## 4. `any` 타입

- 타입 계층도를 완전히 무시하는 **치트키 타입**.
- 모든 타입의 **슈퍼 타입이면서 서브 타입**이기도 함.
- `unknown` 타입과 달리 **다운캐스팅 가능**.
- `never` 타입을 제외한 **모든 타입과 자유롭게 변환 가능**.

### ✅ 코드 예시

- `any` 타입 변수에 `unknown` 타입 변수 넣기
  ```tsx
  let unknownVar: unknown;
  let anyVar: any;
  anyVar = unknownVar; // ✅ 다운캐스팅 가능 (오류 없음)
  ```

- `any` 타입 변수에 `undefined` 타입 변수 넣기
  ```tsx
  let undefinedVar: undefined;
  let anyVar: any;
  undefinedVar = anyVar; // ✅ 다운캐스팅 가능 (오류 없음)
  ```

- `never` 타입 변수에 `any` 타입 변수 넣기
  ```tsx
  let neverVar: never;
  let anyVar: any;
  neverVar = anyVar; // ❌ 오류 발생
  ```

---

## 🔥 최종 정리

- `unknown`: 모든 타입의 **슈퍼 타입**, 하지만 다운캐스팅 불가.
- `never`: 모든 타입의 **서브 타입**, 값이 없으며 업캐스팅만 가능.
- `void`: 반환값이 없는 함수에서 사용, `undefined`의 슈퍼 타입.
- `any`: 모든 타입과 변환 가능, 타입 계층도를 무시하는 **치트키 타입**.


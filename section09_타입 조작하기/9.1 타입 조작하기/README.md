# 타입 조작하기

## 타입을 조작한다는 것은?

* 타입스크립트에서 "타입을 조작한다"는 것은 기존의 **기본 타입**, **타입 별칭**, **인터페이스** 등을 바탕으로 **조건**, **키**, **패턴**, **제네릭** 등을 이용하여 **새로운 타입을 생성하거나 변경**하는 작업을 의미합니다.

* 이러한 기능은 복잡한 타입 시스템을 유연하게 다루고, 반복되는 패턴을 줄이며, 안전하고 예측 가능한 코드 작성을 가능하게 해줍니다.

* 특히 아래 기능들을 사용하면 타입을 마치 **데이터처럼 다룰 수 있는 수준**으로 조작할 수 있습니다.

---

## 타입 조작의 핵심 기능들

### 1. 인덱스드 엑세스 타입 (Indexed Access Types)

* 객체, 배열, 튜플 타입에서 **특정 프로퍼티나 요소의 타입만 추출**할 수 있습니다.
* 문법: `T[K]`
  → `T`는 객체 타입, `K`는 해당 객체 타입의 키 중 하나입니다.
* 사용 예:

  ```ts
  type Person = { name: string; age: number };
  type NameType = Person['name']; // string
  ```

<br />

### 2. `keyof` 연산자

* 객체 타입으로부터 **정의된 모든 키들의 유니온 타입**을 추출합니다.
* 문법: `keyof T`
* 사용 예:

  ```ts
  type Person = { name: string; age: number };
  type Keys = keyof Person; // "name" | "age"
  ```

<br />

### 3. 맵드 타입 (Mapped Types)

* **기존 타입을 반복적으로 순회하여 새로운 타입을 생성**합니다.
* 주로 `keyof`와 함께 사용됩니다.
* 문법:

  ```ts
  type MappedType<T> = {
    [K in keyof T]: T[K];
  };
  ```
* 응용 예: 모든 프로퍼티를 선택적으로 만들기

  ```ts
  type Optional<T> = {
    [K in keyof T]?: T[K];
  };
  ```
  
<br />

### 4. 템플릿 리터럴 타입 (Template Literal Types)

* 문자열 리터럴 타입들을 **조합하거나 패턴화된 문자열 타입**으로 변형할 수 있습니다.
* 문법: ```${...}```
* 사용 예:

  ```ts
  type Lang = 'en' | 'ko';
  type MessageKey = `message_${Lang}`; // "message_en" | "message_ko"
  ```

---

## 그 외 자주 사용되는 타입 조작 도구

### 5. 조건부 타입 (Conditional Types)

* 조건에 따라 타입을 다르게 설정할 수 있습니다.
* 문법: `T extends U ? X : Y`
* 예시:

  ```ts
  type IsString<T> = T extends string ? 'Yes' : 'No';
  type A = IsString<'hello'>; // "Yes"
  type B = IsString<123>;     // "No"
  ```

---

## 결론

* 타입스크립트의 타입 조작 기능은 **정적인 타입 시스템을 매우 유연하게** 만들어 줍니다. 이러한 기능을 잘 활용하면 재사용 가능한 타입을 정의하고, 복잡한 조건과 형태의 데이터 구조를 정밀하게 표현하며, 런타임 전에 오류를 방지할 수 있습니다.

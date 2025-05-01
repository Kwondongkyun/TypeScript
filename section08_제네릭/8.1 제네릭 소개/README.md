# 타입스크립트 제네릭이 필요한 이유와 개념 정리

## 기존 문제점: 다양한 타입을 처리하는 함수 만들기

### 1. 특정 타입만 받는 함수

```tsx
function func(value: string) {
  return value;
}

func(10);   // 오류
func(true); // 오류
```

- 이 함수는 `string`만 받을 수 있어서 숫자나 불리언을 넣으면 오류가 발생합니다.

<br />

### 2. `any` 타입으로 해결?

```tsx
function func(value: any) {
  return value;
}

let num = func(10);
num.toUpperCase(); // 오류 발생 X (런타임 오류 발생 가능)

let bool = func(true);
let str = func("string");
```

- `any` 타입은 타입 안전성을 완전히 포기한 것과 같습니다.
- 변수 `num`, `bool`, `str` 의 타입은 `func`함수가 매개변수를 그대로 반환하는 함수이므로 인수로 전달한 값의 타입과 같은 타입으로 기대하지만 그렇지 않고 모두 `any`타입이 됩니다.

  ➡️ 함수에 숫자값이 들어가는 너무나 자명한 상황인데도 문자열 메서드(`toUpperCase()`)를 사용해도 오류를 발생시키지 않습니다.

<br />

### 3. `unknown` 타입으로 해결?

```tsx
function func(value: unknown) {
  return value;
}

let num = func(10);
num.toFixed(); // 오류 발생 O
```

- `unknown`은 `any`보다 안전하지만, 반환값도 `unknown`이 되어 메서드 사용 시마다 타입 좁히기를 해줘야 합니다.

---

## 해결 방법: 제네릭 함수

### 제네릭이란?

- **일반적이고 범용적인 타입을 정의하는 방법**입니다.
- 함수나 클래스가 다양한 타입에서 재사용될 수 있도록 해줍니다.

<br />

### 제네릭 함수 만들기

```tsx
function func<T>(value: T): T {
  return value;
}

let num = func(10);        // T는 number
let bool = func(true);     // T는 boolean
let str = func("string");  // T는 string
```

- `<T>`는 타입 변수로, 함수 호출 시 전달된 인수의 타입에 따라 자동으로 추론됩니다.
- `any`와 달리 타입이 정확히 유지되므로 타입 안전성을 확보할 수 있습니다.

---

## 제네릭의 추가 기능

### 1. 타입 직접 지정하기

```tsx
let arr = func<[number, number, number]>([1, 2, 3]);
```

- 타입 추론이 아니라 개발자가 명시적으로 `T`에 어떤 타입을 쓸지 지정할 수 있습니다.

<br />

### 2. 튜플 타입 다루기

```tsx
let arr = func([1, 2, 3] as [number, number, number]);
```

- `as`를 사용하거나, 아예 `<[number, number, number]>`로 직접 지정해주면 제네릭 타입이 튜플로 처리됩니다.

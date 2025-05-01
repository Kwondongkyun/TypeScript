# 제네릭 타입 변수 활용 정리

## 활용 1 - 2개의 타입 변수가 필요한 제네릭 함수

### 기존 문제 코드

```tsx
function swap(a: any, b: any) {
  return [b, a];
}

const [a, b] = swap(1, 2);
```

- `a`, `b`에 어떤 타입이 들어올지 몰라 `any`를 사용 → **타입 안전성 부족**

<br />

### 개선: 제네릭 함수로 변경

```tsx
function swap<T>(a: T, b: T): [T, T] {
  return [b, a];
}

const [a, b] = swap(1, 2);
```

- 두 인수의 타입이 동일하다는 전제하에 `T` 타입 변수 하나로 해결
- 하지만 `swap("1", 2)` 호출 시 **타입 에러 발생**

#

### ❗ 문제:

```tsx
swap("1", 2);
```

- 첫 번째 인수 `"1"`으로 인해 `T`는 `string`으로 추론됨
- 두 번째 인수 `2`는 `number`이므로 **타입 불일치 발생**

<br />

### 해결: 타입 변수를 두 개 사용

```tsx
function swap<T, U>(a: T, b: U): [U, T] {
  return [b, a];
}

const [a, b] = swap("1", 2); // a: number, b: string
```

- `T`, `U` 두 개의 타입 변수를 사용하여 서로 다른 타입을 허용

---

## 활용 2 - 다양한 배열 타입을 인수로 받는 제네릭 함수

### 기존 문제 코드

```tsx
function returnFirstValue(data: any) {
  return data[0];
}
```

- `any` 사용으로 타입 추론 불가능 → **타입 안전성 없음**

<br />

### ❗ 잘못된 제네릭 시도

```tsx
function returnFirstValue<T>(data: T): T {
  return data[0]; // ❌ 오류 발생
}
```

- `T`는 아직 확정되지 않은 상태 → 기본적으로 `unknown`으로 간주됨
- `unknown[0]` 접근은 불가

<br />

### 해결: 배열 타입 명시

```tsx
function returnFirstValue<T>(data: T[]): T {
  return data[0];
}

let num = returnFirstValue([0, 1, 2]); // num: number
let str = returnFirstValue(["hello", "mynameis"]); // str: string
```

- `T[]`로 명시하여 `data[0]` 접근 가능
- 배열 요소 타입(`T`)을 정확히 추론

#

### 문제: 다양한 타입이 섞인 배열

```tsx
let result = returnFirstValue([1, "hello", "world"]);
```

- `T`가 `number | string`으로 추론되어 **반환 타입이 유니온 타입**이 됨 → `result: number | string`

<br />

### 해결: 튜플 타입으로 변경

```tsx
function returnFirstValue<T>(data: [T, ...unknown[]]): T {
  return data[0];
}

let value = returnFirstValue([1, "hello", "world"]); // value: number
```

- 첫 번째 요소의 타입만 `T`로 추론, 나머지는 `unknown[]`으로 무시
- **첫 번째 요소의 타입만 정확히 추론 가능**

---

## 활용 3 - 타입 변수를 제한하는 사례

### 기존 코드

```tsx
function getLength(data: any) {
  return data.length;
}

let var = getLength(10); // 오류 발생 위험
```

- `any` 사용 → `length`가 없는 타입도 허용되어 **오류 발생 위험**

<br />

### 제네릭으로 바꾸되 제한 없이 사용 시 문제 발생

```tsx
function getLength<T>(data: T): number {
  return data.length; // ❌ 오류: T는 아직 unknown
}
```

- `T`는 `unknown`으로 간주되므로 `.length` 접근 불가

<br />

### 해결: 타입 제한 (`extends` 사용)

```tsx
function getLength<T extends { length: number }>(data: T): number {
  return data.length;
}

getLength([1, 2, 3]); // ✅
getLength("hello"); // ✅
getLength({ length: 10 }); // ✅
getLength(123); // ❌ 오류
```

- `T`는 반드시 `length: number` 프로퍼티를 가진 타입이어야 함
- `number`, `boolean` 등 `length`가 없는 타입은 자동으로 **오류 처리**

---

## 마무리 요약

| 상황 | 해결 방법 |
| --- | --- |
| 두 인수 타입이 다를 수 있는 함수 | 타입 변수 2개 사용 (`<T, U>`) |
| 배열 인덱스 접근 함수 | `T[]` 또는 `[T, ...unknown[]]` 사용 |
| 특정 속성이 필요한 타입만 허용 | `T extends { prop: type }` 형식으로 제한 |

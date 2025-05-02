# TypeScript로 map, forEach 메서드 타입 직접 정의해보기

TypeScript를 공부하다 보면 자주 사용하는 배열 메서드인 `map`과 `forEach`가 어떻게 타입 정의되어 있는지 궁금해질 수 있습니다. 이번에는 이 두 메서드의 타입을 직접 구현해보며, **제네릭(Generic)** 의 활용법을 복습해보겠습니다.

---

## 기본 map 메서드 사용

```tsx
const arr = [1, 2, 3];
const newArr = arr.map((it) => it * 2);
```

* `it` 매개변수의 타입은 `number`로 자동 추론됩니다.
* 이는 TypeScript가 `map` 메서드에 대한 타입을 미리 정의해놓았기 때문입니다.



### lib.es5.d.ts에 정의된 map 타입

```tsx
map<U>(
  callbackfn: (value: T, index: number, array: T[]) => U,
  thisArg?: any
): U[];
```

* `T`, `U`는 타입 변수
* `callbackfn`은 함수 타입 표현식으로 타입이 지정됩니다.

---

## map 메서드 타입 직접 구현하기

### 1단계 - 타입 없이 구현

```tsx
function map(arr: unknown, callback: (item: unknown) => unknown) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i]));
  }
  return result;
}
```

* 매개변수의 타입이 `unknown`이기 때문에 타입 추론이 되지 않고, 실용성이 낮습니다.

<br />

### 2단계 - 제네릭 사용해서 개선하기

```tsx
function map<T>(arr: T[], callback: (item: T) => T) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i]));
  }
  return result;
}
```

* 타입 변수 `T`를 사용해서 `arr`와 `callback`의 매개변수를 연결
* 하지만 반환값도 `T`로 고정되어 있어 아래 예시에서 오류 발생

  ```tsx
  map(["hi", "hello"], (it) => parseInt(it)); // ❌ 에러 발생
  ```

<br />

### 3단계 - 두 개의 타입 변수로 일반화

```tsx
function map<T, U>(arr: T[], callback: (item: T) => U): U {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i]));
  }
  return result;
}
```

* 이제 콜백 함수의 반환값 타입도 `U`로 분리하여 유연하게 처리 가능
* 성공 예시:
  
  ```tsx
  map(["hi", "hello"], (it) => parseInt(it)); // ✅ 정상 동작
  ```

---

## 🔁 forEach 메서드도 정의해보자

```tsx
const arr2 = [1, 2, 3];
arr2.forEach((it) => console.log(it));
```

### lib.d.ts에 정의된 forEach

```tsx
forEach(
  callbackfn: (value: T, index: number, array: T[]) => void,
  thisArg?: any
): void;
```

<br />

### 직접 구현해보기

#### 기본 버전

```tsx
function forEach(arr: unknown, callback: (item: unknown) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i]);
  }
}
```

* `arr2`의 요소가 `number`이지만 추론되지 않음

<br />

#### 제네릭 사용 버전

```tsx
function forEach<T>(arr: T[], callback: (item: T) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i]);
  }
}
```

* `arr2`의 요소 타입이 `T`로 자동 추론되어 정확한 타입 보장

  ```tsx
  forEach(arr2, (it) => console.log(it.toFixed())); // ✅ 정상 동작
  ```

---

## 🧠 마무리 총정리

| 항목           | 요약                                              |
| ------------ | ----------------------------------------------- |
| 제네릭 함수       | 여러 타입에 유연하게 대응 가능한 함수                           |
| `map<T, U>`  | 입력 타입 `T`, 출력 타입 `U`로 범용화 가능                    |
| `forEach<T>` | 입력만 필요하므로 타입 변수는 하나로 충분                         |
| 콜백 함수 타입     | `(item: T) => U` 또는 `(item: T) => void` 형식으로 지정 |
| 활용 팁         | 직접 구현해보면 타입 설계 능력 향상에 큰 도움!                     |


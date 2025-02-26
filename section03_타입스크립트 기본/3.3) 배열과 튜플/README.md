# 배열 타입

- TypeScript에서 배열은 동일한 타입의 요소들을 담는 자료구조입니다.
- 배열 타입은 요소 타입 뒤에 대괄호([])를 붙여서 정의합니다.
  Ex) `: number[]`

<br />

### 배열 타입을 정의하는 방식
```tsx
let numArr: number[] = [1, 2, 3];
let strArr: string[] = ["Hello", "im", "kwon"];

// 제네릭 문법 사용
let boolArr: Array<boolean> = [true, false, true];
```

<br />

### 배열에 다양한 타입의 요소가 포함될 경우

```tsx
let multiArr = [1, "hello"];
```
<img width="400" alt="스크린샷 2025-01-10 19 15 40" src="https://github.com/user-attachments/assets/08627aa7-6817-42d7-8126-d6c21efc972b" />

- TypeScript는 점진적 타입 시스템을 사용하기 때문에, 초기화 값을 기준으로 타입을 자동 추론합니다.
- 위 예제에서 `multiArr`는 `(string | number)[]` 타입으로 추론됩니다.

  ```tsx
  let multiArr: (number | string)[] = [1, "hello"];
  let multiArrTest: Array<number | string> = [1, "string"];
  ```

- 유니온 타입(`|`)을 사용하면 요소가 특정한 여러 타입을 가질 수 있습니다.

<br />

### 다차원 배열 타입 정의

1. 요소들의 타입을 명시합니다.
2. 배열의 차원만큼 대괄호(`[]`)를 추가합니다.

  ```tsx
  let doubleArr: number[][] = [
    [1, 2, 3],
    [4, 5],
  ];
  ```

- 위 배열은 `number[]` 타입의 배열을 요소로 가지는 2차원 배열입니다.

---

# 튜플 타입

- 튜플은 TypeScript에서 제공하는 특별한 배열 타입으로, **길이와 요소 타입이 고정**된 배열입니다.

> **자바스크립트의 배열** : 기본적으로 길이와 타입 둘 다 고정이 안되어있다.<br />
> **타입스크립트의 배열** : 배열에 들어가는 요소의 타입은 고정시킬 수 있지만 길이까지 고정시킬 수는 없다.

### 튜플 타입 정의 예시

```tsx
// 길이가 2이고, 첫 번째 요소는 number, 두 번째 요소도 number
let tup1: [number, number] = [1, 2];

// 길이가 3이고, 요소 타입이 각각 number, string, boolean
let tup2: [number, string, boolean] = [1, "2", true];
```

<br />

#### 잘못된 튜플 사용 예시

  ```tsx
  tup1 = [1, 2, 3]; // 오류: 길이를 초과함
  tup1 = ["1", "2"]; // 오류: 타입이 일치하지 않음
  ```

<br />

#### 튜플의 배열 메서드 사용 주의점:
- 튜플은 컴파일 후 JavaScript의 배열로 변환되므로, 배열 메서드를 사용할 수 있습니다.
  ```javascript
  let tup1 = [1, 2];
  let tup2 = [1, "2", true];
  ```

- 배열 메서드 사용  
  ```tsx
  tup1.push(1); // 오류가 발생하지 않음
  tup1.pop();
  tup1.pop();
  tup1.pop();
  ```

<br />

**문제점:**
- 튜플의 길이가 고정되어 있지만, `push()`와 같은 배열 메서드를 사용할 때는 길이 제한이 적용되지 않습니다. (TypeScript가 내부적으로 일반 배열처럼 취급하기 때문)

<br />

### 튜플 사용 예시

튜플은 요소의 순서가 중요한 경우 유용합니다.

```tsx
const users: [string, number][] = [
  ["kwon", 1],
  ["park", 2],
  ["choi", 3],
  ["won", 4],
  [5, "kim"], // 오류 발생: 타입 순서가 다름
];
```


# 대수 타입 (Algebraic Types)

- 여러 개의 타입을 조합하여 새로운 타입을 만드는 개념을 **대수 타입**이라고 한다.
- 대수 타입에는 **합집합 타입 (Union Type)** 과 **교집합 타입 (Intersection Type)** 이 존재한다.

<br />

## 1. 합집합 타입 (Union Type)

- 여러 개의 타입 중 **하나 이상**을 가질 수 있는 타입이다.
- `|` 연산자를 사용하여 정의할 수 있으며, 개수에 제한이 없다.
- 대표적인 예로 `string | number` 타입이 있다.

### 기본 타입에서의 `union` 타입

```tsx
let a: string | number; // string 또는 number 타입을 가질 수 있음

a = 1;      // 유효함
a = "hello"; // 유효함
```

- 다양한 기본 타입을 조합할 수도 있다.

  ```tsx
  let a: string | number | boolean; // 세 가지 타입을 포함하는 합집합
  
  a = 1;
  a = "hello";
  a = true;
  ```

<br />

### `union` 타입을 배열에서 사용하기

```tsx
let arr: (number | string | boolean)[] = [1, "hello", true];
```

- 위 배열은 `number`, `string`, `boolean` 타입의 요소를 포함할 수 있다.

<br />

### 객체 타입에서의 `union` 타입
- 타입 별칭을 이용해서도 `union` 타입을 만들 수 있다.

  ```tsx
  type Dog = {
    name: string;
    color: string;
  };
  
  type Person = {
    name: string;
    language: string;
  };
  
  type UnionType = Dog | Person;
  ```
  - `Dog` 타입과 `Person` 타입의 관계

    - 누구도 서로의 슈퍼 타입이거나 서브타입이지 않고 교집합을 가지고 있는 타입이다.
    - 각각 `color`, `language`라는 서로에게는 없는 프로퍼티를 가지고 있기 때문이다.

<br />

### `UnionType`의 변수 정의 및 값 할당

```tsx
// Dog 타입의 객체
let union1: UnionType = {
  name: "Buddy",
  color: "Brown",
};

// Person 타입의 객체
let union2: UnionType = {
  name: "Alice",
  language: "English",
};

// Dog + Person 타입 (둘 다 포함)
let union3: UnionType = {
  name: "Charlie",
  color: "Black",
  language: "French",
};

// 공통 속성(name)만 포함하는 경우 (에러 발생)
let union4: UnionType = {
  name: "John", // Error: 'color' 또는 'language' 속성이 필요함
};
```

<img width="450" alt="Dog 타입과 Person 타입 관계" src="https://github.com/user-attachments/assets/ff9f0952-6c65-435c-9075-6ea842ce4e09" />

`union1`

- `name`, `color` 프로퍼티 보유
- `Dog` 타입에는 포함이 되지만 `Person` 타입에는 포함이 안되는 객체이다.

`union2`

- `name`, `language` 프로퍼티 보유
- `Person` 타입에는 포함이 되지만 `Dog` 타입에는 포함이 안되는 객체이다.

`union3`

- `name`, `color`, `language` 프로퍼티 보유
- `Dog` 타입에는 포함이 되고 `Person` 타입에도 포함이 되는 객체이다.
    - 교집합에 위치한다.

  → `union1`, `union2`, `union3` : `Dog`와 `Person`의 합집합 타입에 들어간다.

`union4`

- `name` 프로퍼티밖에 없다.
- 합집합 바깥에 존재한다. → Union1 이라는 합집합 타입에 포함되지 않기 때문에 오류가 발생한다.


> `union1`, `union2`, `union3`는 `Dog | Person` 타입에 포함되지만,<br />
> `union4`는 `name`만 가지고 있어 `Dog` 타입도, `Person` 타입도 아니므로 오류가 발생한다.

---

## 2. 교집합 타입 (Intersection Type)

- 여러 개의 타입을 **모두 만족하는** 타입을 정의할 때 사용한다.
- `&` 연산자를 사용하여 정의할 수 있다.
- 기본타입으로 Intersection Type을 만들시 웬만하면 다 never 타입이다.
  - 기본 타입들 중에서는 서로 공유하거나 겹치는 값들이 없기 때문이다.
  - 따라서 객체 타입에서 많이 사용한다.

### 기본 타입에서의 `intersection` 타입

```tsx
let variable: number & string; // never 타입
```
<img width="450" alt="기본 타입에서의 교집합 타입" src="https://github.com/user-attachments/assets/ed220d4f-47a7-4d5a-ab8d-9f589a8750f4" />

- `number`와 `string` 타입의 교집합은 존재하지 않기 때문에 `never` 타입이 된다.

<br />

### 객체 타입에서의 `intersection` 타입

```tsx
type Dog = {
  name: string;
  color: string;
};

type Person = {
  name: string;
  language: string;
};

type IntersectionType = Dog & Person;
```
<img width="400" alt="객체 타입에서의 교집합 타입" src="https://github.com/user-attachments/assets/bc0c1f0e-ee8b-479b-9d06-e8e500bdedbd" />

- `IntersectionType`은 `Dog` 타입과 `Person` 타입의 모든 속성을 포함해야 합니다.

<br />

#### `IntersectionType`의 변수 정의
- `IntersectionType`의 객체는 **모든 프로퍼티**(`name`, `color`, `language`)를 포함해야 합니다.
  ```tsx
  let intersection: IntersectionType = {
    name: "Charlie",
    color: "Brown",
    language: "English",
  };
  ```

---

**요약**
- `Union` 타입: 둘 중 하나의 타입만 충족해도 됨.
- `Intersection` 타입: 모든 타입을 만족해야 함.

---

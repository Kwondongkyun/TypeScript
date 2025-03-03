# 타입 단언 (Type Assertion)

## 초기화 값의 타입 단언하기

변수의 타입이 예상과 다르게 추론될 경우 원하는 기능을 구현하기 어려울 수 있습니다. 이럴 때 타입 단언을 사용하면 됩니다.

```tsx
type Person = {
  name: string;
  age: number;
};

// 빈 객체로 초기화한 후 나중에 프로퍼티 값을 설정
let person = {} as Person;
person.name = "kwon";
person.age = 25;
```

### 타입 단언이란?
- `as` 키워드를 사용하여 원하는 타입을 명시하면, 타입스크립트 컴파일러에게 해당 값을 특정 타입으로 간주하도록 할 수 있습니다.
- 이를 **타입 단언 (Type Assertion)** 이라고 합니다.
- 위 코드에서 `person` 변수는 `Person` 타입으로 단언되었기 때문에, 해당 타입을 기준으로 타입 검사가 이루어집니다.

  <img width="350" alt="타입 단언이란?" src="https://github.com/user-attachments/assets/d9efda7f-5c17-4ec8-a0bc-76aedb48d839" />

---

## 타입 단언과 초과 프로퍼티 검사

```tsx
type Dog = {
  name: string;
  color: string;
};

let dog: Dog = {
  name: "뽀삐",
  color: "brown",
  breed: "진도", // 오류 발생
};
```

- 객체 리터럴을 직접 할당할 경우, 타입스크립트는 **초과 프로퍼티 검사 (Excess Property Check)** 를 수행합니다.
- `Dog` 타입에 없는 `breed` 프로퍼티가 포함되어 있어 오류가 발생합니다.

<br />

### 해결 방법: 타입 단언 사용

```tsx
let dog = {
  name: "뽀삐",
  color: "brown",
  breed: "진도",
} as Dog;
```

- 타입 단언을 사용하면 초과 프로퍼티 검사 없이 `dog` 객체가 `Dog` 타입으로 간주됩니다.
- 하지만 타입 안정성이 떨어질 수 있으므로, 가능한 한 피하는 것이 좋습니다.

---

## 타입 단언의 규칙

타입 단언을 사용할 때는 특정 규칙을 따라야 합니다.

```tsx
값 as 단언 (A as B)
```

- `A`가 `B`의 **슈퍼타입**이거나
- `A`가 `B`의 **서브타입**이어야 합니다.

<br />

### 예제 코드

```tsx
let num1 = 10 as never; // num1: never 타입으로 추론
```

- `10`은 `number` 타입이며, `never` 타입은 모든 타입의 서브타입입니다.
- 따라서 `number` → `never` 단언이 가능합니다.

<br />

```tsx
let num2 = 10 as unknown; // num2: unknown 타입으로 추론
```

- `unknown` 타입은 모든 타입의 슈퍼타입이므로 `number` → `unknown` 단언이 가능합니다.

<br />

```tsx
let num3 = 10 as string; // 오류 발생
```

- `number`와 `string`은 서로 관련이 없는 타입이므로 단언이 불가능합니다.

<br />

### 다중 단언

```tsx
let num3 = 10 as unknown as string;
```

- `number` → `unknown` → `string`으로 단언하면 오류 없이 변환 가능하지만, 좋은 방법은 아닙니다.
- 타입 안정성을 해칠 수 있으므로 주의해야 합니다.

---

## `const` 단언

변수를 선언할 때 `const`를 사용한 것과 동일한 효과를 주는 단언입니다.

```tsx
let num4 = 10 as const; // num4: 리터럴 타입 10으로 추론
```

<br />

### 객체 타입과 함께 사용

```tsx
let cat = {
  name: "야옹이",
  color: "yellow",
} as const;
```

<img width="400" alt="객체 타입과 함께 사용" src="https://github.com/user-attachments/assets/fa590ddb-d061-4328-83d6-2ad39ff0b8b2" />


- `as const`를 사용하면 객체의 모든 프로퍼티가 `readonly`로 설정됩니다.
- 즉, 해당 객체의 값을 변경할 수 없습니다.

  ```tsx
  cat.name = "냐옹이"; // 오류 발생 (읽기 전용 프로퍼티)
  ```

---

## Non-Null 단언 (`!` 연산자)

- 값이 `null` 또는 `undefined`가 아닐 것이라고 타입스크립트 컴파일러에게 알려줍니다.

<br />

### 예제 코드

```tsx
type Post = {
  title: string;
  author?: string; // 선택적 프로퍼티
};
```

```tsx
const post: Post = { title: "TypeScript" };
const len: number = post.author?.length; // 오류 발생
```

<br />

### 옵셔널 체이닝 (`?.`)과 Non-Null 단언 (`!`)

- 옵셔널 체이닝(`?.`)을 사용하면 `post.author`가 `undefined`일 경우에도 오류가 발생하지 않습니다.
- 하지만 `post.author?.length`는 `undefined`일 수 있으므로 `number` 타입 변수에 할당할 수 없습니다.



#### 해결 방법: Non-Null 단언 (`!`)

```tsx
const len: number = post.author!.length;
```

- `post.author!`을 사용하면 `post.author`가 `null` 또는 `undefined`가 아니라는 것을 보장합니다.
- 하지만 실제로 `undefined`일 경우 런타임 오류가 발생할 수 있으므로 주의해야 합니다.

---

## 결론

- 타입 단언 (`as`)을 사용하면 타입스크립트의 타입 검사를 우회할 수 있지만, 신중하게 사용해야 합니다.
- `const` 단언을 사용하면 값이 변경되지 않도록 보장할 수 있습니다.
- `!` (`Non-Null` 단언) 연산자는 값이 `null` 또는 `undefined`가 아님을 보장하지만, 실제 값이 `undefined`일 경우 런타임 오류가 발생할 수 있으므로 주의해야 합니다.

**💡 타입 단언은 강력한 기능이지만, 불필요하게 사용하면 타입 안정성을 해칠 수 있습니다. 타입스크립트의 타입 추론을 최대한 활용하고, 필요한 경우에만 타입 단언을 사용하는 것이 좋다!**


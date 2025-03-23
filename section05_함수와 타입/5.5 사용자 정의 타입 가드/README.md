# 사용자 정의 타입 가드 (Custom Type Guard)

### 개요

- **사용자 정의 타입 가드**는 특정 타입을 판별하는 함수를 정의하여 타입스크립트의 타입 체크를 보다 강력하게 수행할 수 있도록 한다. 
- 타입 가드 함수는 `참 또는 거짓`을 반환하며, 이를 활용하면 타입 좁히기(Narrowing)를 효과적으로 수행할 수 있다.

---

## 예시: 개와 고양이를 구별하는 타입 가드

### 1. 타입 정의

```tsx
type Dog = {
  name: string;
  isBark: boolean;
};

type Cat = {
  name: string;
  isScratch: boolean;
};

type Animal = Dog | Cat;
```

<br />

### 2. 타입 가드 함수 구현

```tsx
function isDog(animal: Animal): animal is Dog {
  return (animal as Dog).isBark !== undefined;
}

function isCat(animal: Animal): animal is Cat {
  return (animal as Cat).isScratch !== undefined;
}
```

**설명:**
- `isDog()` 함수는 `animal`이 `Dog` 타입인지 판별
- `isCat()` 함수는 `animal`이 `Cat` 타입인지 판별
- 각각 `animal is Dog`, `animal is Cat`을 반환하여 타입스크립트가 해당 객체를 특정 타입으로 추론할 수 있도록 도움

<br />

### 3. 타입 가드를 활용한 조건문

```tsx
function warning(animal: Animal) {
  if (isDog(animal)) {
    console.log("강아지가 짖습니다!");
  } else if (isCat(animal)) {
    console.log("고양이가 할퀴었습니다!");
  }
}
```

<br />

### 4. 함수 호출 예시

```tsx
const dog: Dog = { name: "멍멍이", isBark: true };
const cat: Cat = { name: "야옹이", isScratch: true };

warning(dog); // 출력: 강아지가 짖습니다!
warning(cat); // 출력: 고양이가 할퀴었습니다!
```

---

## 결론

- **타입스크립트의 함수 오버로딩**을 통해 다양한 입력에 대해 다른 동작을 수행할 수 있다.
- **사용자 정의 타입 가드**를 활용하면 **유니온 타입을 세부 타입으로 안전하게 변환**할 수 있다.
- **타입스크립트의 강력한 타입 시스템을 활용하면 코드의 안정성과 유지보수성을 높일 수 있다.**


# 함수 타입 호환성

## 개요

함수 타입 호환성이란 특정 함수 타입을 다른 함수 타입으로 취급할 수 있는지를 판단하는 개념이다. 이를 결정하는 두 가지 주요 기준이 있다.

1. **반환값의 타입이 호환되는가**
2. **매개변수의 타입이 호환되는가**

이 두 가지 조건을 모두 만족해야만 두 함수 타입이 호환된다고 판단할 수 있다.

# 

## 기준 1. 반환값의 타입이 호환되는가

```tsx
type A = () => number; // number 타입 반환
type B = () => 10; // number 리터럴 타입 10 반환

let a: A = () => 10;
let b: B = () => 10;

a = b; // 허용 O (업캐스팅 발생)
b = a; // 허용 X (다운캐스팅 발생)
```

<br />

### 반환값 타입 호환성 원칙

- 반환값을 비교할 때, **다운캐스팅(더 구체적인 타입으로 변환)이 일어나면 호환되지 않는다.**
- 업캐스팅(더 넓은 범위의 타입으로 변환)은 허용된다.

<br />

➡️ 즉, `B` 타입(리터럴 `10` 반환)을 `A` 타입(일반적인 `number` 반환)으로 할당하는 것은 가능하지만, 반대의 경우는 허용되지 않는다.

---

## 기준 2. 매개변수의 타입이 호환되는가

### 상황 1. 매개변수 개수가 같을 때

```tsx
type C = (value: number) => void;
type D = (value: 10) => void;

let c: C = (value) => {};
let d: D = (value) => {};

c = d; // 오류 발생 (업캐스팅 발생)
d = c; // 허용 O (다운캐스팅 발생)
```

<br />

### 예시) 매개변수 타입 호환성 원칙
> 반환값 타입을 기준으로 호환성을 판단할 때와는 다르게 매개변수의 타입을 기준으로 호환성을 판단할 때는 반대로 업캐스팅일 때는 호환이 안 된다고 평가한다.

- 매개변수의 경우, **업캐스팅(더 넓은 범위의 타입으로 변환)이 허용되지 않는다.**
- 다운캐스팅(더 구체적인 타입으로 변환)은 허용된다.

<br />

➡️  즉, `D`(리터럴 `10`을 매개변수로 받음)를 `C`(일반적인 `number`를 매개변수로 받음)로 할당하는 것은 가능하지만, 반대의 경우는 허용되지 않는다.

<br />

### 객체 타입을 매개변수로 사용할 때

```tsx
type Animal = {  // Animal 타입이 Dog 타입의 슈퍼타입
  name: string;
};

type Dog = {
  name: string;
  color: string;
};

let animalFunc = (animal: Animal) => {
  console.log(animal.name);
};

let dogFunc = (dog: Dog) => {
  console.log(dog.name);
  console.log(dog.color);
};

animalFunc = dogFunc; // 오류 발생 (업캐스팅)
dogFunc = animalFunc; // 허용 (다운캐스팅)
```

- `animalFunc = dogFunc;`와 같은 함수
  ```tsx
  // 매개변수의 타입은 animalFunc의 타입인 Animal 타입을 가진다.
  let testFunc = (animal: Animal) => {
    // 함수 본문 : dogFunc를 집어 넣었으므로 dogFunc의 본문을 따라간다.
    console.log(animal.name);
    console.log(animal.color); // 오류 발생 (Animal 타입에는 color라는 프로퍼티가 없기 때문이다.)
  };
  ```
  - 할당하려는 함수의 매개변수 타입이 서브타입(`Dog` 타입)일 경우 `console.log(animal.color);`와 같이 오류가 발생할 수 있기 때문에 업캐스팅일 때 안되도록 막아준다.

  
- `dogFunc = animalFunc;`와 같은 함수
  ```tsx
  let testFunc2 = (dog: Dog) => {
    // 매개변수의 타입은 animalFunc의 타입인 Animal 타입을 가진다.
    console.log(dog.name); // 허용
  };
  ```
  - `Dog` 타입은 `Animal` 타입의 서브 타입이기 때문에 기본적으로 `Animal` 타입의 객체들이 갖고있는 모든 프로퍼티를 `Dog` 타입은 이미 갖고 있다.
<br />

### 이유

- `animalFunc = dogFunc;` 허용 시
  - `animalFunc` 내부에서는 `Animal` 타입만을 기대하지만, 실제로는 `Dog` 타입 객체가 전달되므로 `color` 프로퍼티 접근 시 오류가 발생할 수 있다.

- `dogFunc = animalFunc;` 허용 시
  - `Dog` 타입이 `Animal` 타입을 포함하므로 안전하게 동작한다.

# 

### 상황 2. 매개변수 개수가 다를 때

```tsx
type Func1 = (a: number, b: number) => void;
type Func2 = (a: number) => void;

let func1: Func1 = (a, b) => {};
let func2: Func2 = (a) => {};

func1 = func2; // 허용
func2 = func1; // 불가
```

<br />

### 매개변수 개수 호환성 원칙

- **매개변수 개수가 더 적은 함수는 매개변수 개수가 더 많은 함수에 할당할 수 있다.**
- **반대는 불가능하다.**

<br />

➡️ 즉, `Func2`(매개변수 1개)를 `Func1`(매개변수 2개)로 할당하는 것은 가능하지만, `Func1`을 `Func2`로 할당하는 것은 허용되지 않는다.

---

## 결론 🚀

- **반환값의 타입** → 업캐스팅 허용, 다운캐스팅 불가
- **매개변수의 타입** → 업캐스팅 불가, 다운캐스팅 허용
- **매개변수 개수** → 적은 매개변수를 가진 함수는 많은 매개변수를 가진 함수에 할당 가능

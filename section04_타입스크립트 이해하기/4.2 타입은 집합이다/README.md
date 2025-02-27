# 타입은 집합이다.

## 타입스크립트의 타입 개념

- 타입스크립트에서 타입(Type)은 여러 개의 값을 포함하는 집합(Set)이다.

---

## 1. 집합(Set)이란?

- **집합**이란, 동일한 속성과 특징을 갖는 여러 개의 원소들을 하나로 묶어둔 단위이다.

<br />

### 1.1 예제: `number` 타입
<img width="250" alt="`number` 타입" src="https://github.com/user-attachments/assets/3ea096c3-144c-401b-928d-39329d92e50b" />

```typescript
let num: number = 10;
```

- `number` 타입은 여러 개의 숫자 값들을 묶어 놓은 집합이다.


<br />

### 1.2 예제: `Number Literal` 타입
<img width="250" alt="`Number Literal` 타입" src="https://github.com/user-attachments/assets/3f065376-4b54-40a6-8954-ecde45f9fa0e" />

```typescript
let num: 20 = 20;
```

- `20`이라는 숫자는 `20`이라는 하나의 값만을 포함하는 아주 작은 집합이다.
- 숫자 `20`은 **`20`이라는 집합**뿐만 아니라, **`number` 타입(더 큰 집합)** 에도 속한다.
- 즉, **모든 `Number Literal` 타입(`10`, `20`, `30` 등)은 `number` 타입의 부분 집합이다.**

---

## 2. 타입스크립트의 모든 타입

- 타입스크립트의 모든 타입은 **집합으로서 서로 포함하고 포함되는 관계를 가진다.**
<img width="250" height="300" alt="타입 관계" src="https://github.com/user-attachments/assets/3ae85477-fdc3-4883-a228-4270a03207c7" />
<img width="250" height="300" alt="타입 계층 구조" src="https://github.com/user-attachments/assets/2a839f6f-2411-4910-9216-0201a44d69f0" />


### 2.1 슈퍼 타입(Super Type)과 서브 타입(Sub Type)

- **슈퍼 타입 (부모 타입)**  
  → 다른 타입을 포함하는 더 큰 타입 (예: `number` 타입)

- **서브 타입 (자식 타입)**  
  → 다른 타입에 포함되는 더 작은 타입 (예: `10` 리터럴 타입)

---

## 3. 타입 호환성(Type Compatibility)

- **어떤 타입을 다른 타입으로 취급해도 괜찮은지 판단하는 개념**이다.
<img width="500" alt="타입 호환성" src="https://github.com/user-attachments/assets/200c0455-d583-459c-9b81-c897bf77f6bd" />


### 3.1 `Number Literal` 타입 → `Number` 타입 변환

```typescript
let num1: number = 10;
let num2: 10 = 10;

num1 = num2; // 가능 ✅
```

- `Number Literal` 타입(`10`)은 `Number` 타입의 부분 집합이므로, `number` 타입으로 변환이 가능하다.

<br />

### 3.2 `Number` 타입 → `Number Literal` 타입 변환

```typescript
let num1: number = 10;
let num2: 10 = 10;

num2 = num1; // 에러 ❌
```

- `number` 타입은 `10` 리터럴 타입보다 더 큰 집합이므로, 변환이 불가능하다.

---

## 4. 업캐스팅(Upcasting)과 다운캐스팅(Downcasting)

### 4.1 업캐스팅 (가능 ✅)

- **서브 타입(더 작은 타입) → 슈퍼 타입(더 큰 타입) 변환**  
- **모든 상황에서 허용된다.**

```typescript
let num1: number = 10;
let num2: 10 = 10;

num1 = num2; // 가능 ✅
```

<br />

### 4.2 다운캐스팅 (대부분 불가능 ❌)

- **슈퍼 타입(더 큰 타입) → 서브 타입(더 작은 타입) 변환**  
- **대부분의 경우 허용되지 않는다.**

```typescript
let num1: number = 10;
let num2: 10 = 10;

num2 = num1; // 에러 ❌
```

- `number` 타입은 `10` 타입보다 더 큰 집합이므로, 변환이 불가능하다.

---

## 5. 정리

1. **타입은 집합이다**  
   - 여러 개의 값을 포함하는 집합 개념을 갖는다.
   - 예: `number` 타입은 모든 숫자를 포함하는 집합이다.
   - 예: `10` 타입은 단 하나의 숫자만 포함하는 작은 집합이다.

2. **타입 계층 구조**  
   - 모든 타입은 서로 포함하고 포함되는 관계를 가진다.
   - `Number Literal` 타입은 `number` 타입의 부분 집합이다.

3. **타입 호환성**  
   - 작은 집합(서브 타입)은 큰 집합(슈퍼 타입)으로 변환될 수 있다. (업캐스팅 가능)
   - 큰 집합(슈퍼 타입)은 작은 집합(서브 타입)으로 변환될 수 없다. (다운캐스팅 불가능)

---

# 제네릭 클래스 (Generic Class)

* 타입스크립트에서 제네릭을 사용하면 클래스, 함수, 인터페이스 등에서 **코드의 재사용성과 타입 안전성**을 동시에 높일 수 있습니다.
* **제네릭 클래스(Generic Class)** 를 중심으로, 일반 클래스의 한계와 이를 제네릭으로 극복할 수 있습니다.

---

## 1. 일반 클래스의 한계

### 기본적인 클래스 생성

```tsx
class NumberList {
  constructor(private list: number[]) {}

  push(data: number) {
    this.list.push(data);
  }

  pop() {
    return this.list.pop();
  }

  print() {
    console.log(this.list);
  }
}
```

<br />

### 사용 예시

```tsx
// 인스턴스 생성
const numberList = new NumberList([1, 2, 3]);
numberList.pop();
numberList.push(4);
numberList.print(); // [1, 2, 4]
```

<br />

### 문제점

* number 타입에 고정되어 있어서 문자열(string)이나 다른 타입의 데이터를 다룰 수 없습니다.
* 다른 타입이 필요할 때마다 새로운 클래스를 만들어야 합니다. (StringList, BooleanList 등 → 비효율적)

#

## 2. 해결책: 제네릭 클래스 사용
* **제네릭 클래스**를 사용하면 타입에 관계없이 재사용할 수 있습니다.

  ```tsx
  class List<T> {  // 1️⃣
    constructor(private list: T[]) {}  // 3️⃣
  
    push(data: T) {
      this.list.push(data);  // 4️⃣
    }
  
    pop(): T | undefined {
      return this.list.pop();
    }
  
    print() {
      console.log(this.list);
    }
  }
  ```

* `T`는 타입 변수(Type Variable)로, 해당 클래스 내부에서 다양한 타입으로 대체될 수 있습니다.

### 사용 예시

```tsx
// 생성자 인수의 타입으로 T 자동 추론
const numberList = new List([1, 2, 3]);  // T = number로 추론 2️⃣
numberList.pop();
numberList.push(4);
numberList.print(); // [1, 2, 4]

// 타입 명시
const stringList = new List<string>(["hello", "world"]);  // T = string 4️⃣
stringList.pop();
stringList.push("nice");
stringList.print(); // ['hello', 'nice']
```

<br />

### 설명

1️⃣. `List` 클래스를 제네릭 클래스로 생성<br />
2️⃣. `List`의 생성자를 호출하면서 생성자의 인수로 `number` 타입의 배열 전달<br />
3️⃣. `list` 매개변수에 들어오는 값의 타입이 `number` 타입의 배열이므로 `T`도 `number` 타입으로 추론<br />
4️⃣. `push`메서드의 `data` 매개변수도 `number` 타입으로 추론이 되어 push 메서드의 인수로 `number` 타입의 값 전달 가능

#

## 3. 타입 명시도 가능

* 자동 추론도 가능하지만 명시적으로 타입을 지정해 줄 수도 있습니다.

  ```tsx
  const booleanList = new List<boolean>([true, false]);
  booleanList.push(true);
  booleanList.print(); // [true, false, true]
  ```

#

## 4. 제네릭 클래스의 특징 요약

* **재사용성**: 다양한 타입을 다룰 수 있어 코드 중복이 줄어듭니다.
* **타입 안전성**: 타입스크립트가 타입을 추론하거나 직접 명시할 수 있어 잘못된 타입 사용을 방지합니다.
* **유연성**: 하나의 클래스로 다양한 데이터 타입을 처리할 수 있습니다.

#

## 5. 제네릭 클래스에 타입 제한하기 (extends 사용)

* 때때로 제네릭 타입에 특정 조건을 걸고 싶을 수도 있습니다.
* `extends` 키워드를 사용해 타입 제한을 둘 수 있습니다.

  ```tsx
  class List<T extends string | number> {
    constructor(private list: T[]) {}
  
    push(data: T) {
      this.list.push(data);
    }
  
    pop(): T | undefined {
      return this.list.pop();
    }
  
    print() {
      console.log(this.list);
    }
  }
  ```

  * `T`는 `string` 또는 `number` 타입만 허용됩니다.
  * `List<boolean>`과 같은 인스턴스는 에러 발생 → 타입 제한을 통해 안정성을 확보합니다

---

## 한눈에 보기: 제네릭 클래스 정리표

| 항목              | 설명                                     |
| --------------- | -------------------------------------- |
| `class List<T>` | 제네릭 클래스 선언                             |
| `T`             | 타입 변수 (어떤 타입이든 유연하게 처리 가능)             |
| 자동 타입 추론        | 생성자 인수로 전달된 배열을 기준으로 타입 추론             |
| 명시적 타입 지정       | `new List<string>(["a", "b"])`처럼 명시 가능 |
| 타입 제한           | \`T extends string \| number\` 사용 가능 |
| 장점              | 코드 재사용, 타입 안전성, 유연성                    |

---

## 마무리


* 제네릭 클래스는 다양한 타입의 데이터를 하나의 클래스 구조로 유연하게 다룰 수 있게 해줍니다.
* 코드 중복을 줄이고 타입 안정성을 높이며, 유지보수에 강한 코드를 만들 수 있는 핵심 문법입니다.


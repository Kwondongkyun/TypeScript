# 타입스크립트의 클래스

## 1. 클래스 사용 목적

자바스크립트 객체를 반복적으로 만들다 보면 **중복 코드**가 많아지고 유지보수가 어려워짐 <br />
➡️ **클래스를 사용하면 공장처럼 객체를 찍어낼 수 있음**

# 

## 2. 객체를 먼저 만들어보기

```tsx
const employee = {
  name: "kwon",
  age: 25,
  position: "developer",
  work() {
    console.log("working");
  },
};
```

#

## 3. 클래스 선언하기

### 필드 선언

```tsx
class Employee {
  name;       // 오류 발생: 암시적 any
  age;
  position;
}
```

- **오류 이유**: 타입스크립트에서는 타입이 명시되지 않으면 암시적으로 `any`로 추론됨 <br />
  ➡️ `noImplicitAny` 옵션이 true일 경우 오류 발생

<br />

### 오류 해결 방법

#### 1. **타입 명시 + 생성자 추가**

```tsx
class Employee {
  name: string;
  age: number;
  position: string;

  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }
}
```

<br />

#### 2. **기본값 설정**

```tsx
class Employee {
  name: string = "";
  age: number = 0;
  position: string = "";
}
```

<br />

#### 3. **선택적 프로퍼티**

```tsx
class Employee {
  name?: string;
  age?: number;
  position?: string;
}
```

#

## 4. 클래스 메서드 정의
- 객체의 메서드 정의 방법과 같다.

  ```tsx
  class Employee {
    name: string;
    age: number;
    position: string;
  
    constructor(name: string, age: number, position: string) {
      this.name = name;
      this.age = age;
      this.position = position;
    }
  
    work() {
      console.log("working");
    }
  }
  ```

#

## 5. 클래스 인스턴스 생성

```tsx
const employeeB = new Employee("kwon", 25, "개발자");
console.log(employeeB);
// Employee { name: 'kwon', age: 25, position: '개발자' }
```

#

## 6. 클래스는 타입이다

- 타입스크립트에서 클래스는 **타입으로도 사용** 가능하다.
- 타입스크립트는 구조적으로 타입을 결정하는 구조적 타입 시스템을 따르기 때문이다.

  ```tsx
  const employeeC: Employee = {
    name: "",
    age: 0,
    position: "",
    work() {},
  };
  ```

#

## 7. 클래스 상속 (확장)

```tsx
class ExecutiveOfficer extends Employee { // 파생 클래스(`ExecutiveOfficer`)
  officeNumber: number;

  constructor(name: string, age: number, position: string, officeNumber: number) {
    super(name, age, position); // 부모 생성자 호출 (항상 최상단)
    this.officeNumber = officeNumber;
  }
}
```

### 주의사항

1. 타입스크립트에서는 **파생 클래스에서 생성자 작성 시 `super()` 호출이 필수**
2. `super()`는 **생성자 함수 내 최상단**에 있어야 함

#

## 8. 인스턴스 생성 및 확인

```tsx
const executive = new ExecutiveOfficer("lee", 40, "CEO", 101);
console.log(executive);

// ExecutiveOfficer { name: 'lee', age: 40, position: 'CEO', officeNumber: 101 }
```

---

## ✅ 요약: 타입스크립트 클래스 핵심

| 항목 | 설명 |
|------|------|
| 클래스 | 객체 생성 템플릿 |
| 필드 | 클래스가 가지는 속성들 |
| 생성자 | 객체 초기화 함수 |
| 메서드 | 클래스 내부 함수 |
| 타입 명시 | 필드/생성자에 명확한 타입 부여 필요 |
| 클래스 타입 | 클래스 자체를 타입으로 활용 가능 |
| 상속 | `extends` 키워드로 부모 클래스 확장 |
| `super()` | 부모 생성자 호출, 생성자 최상단에서 사용 |

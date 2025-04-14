# 접근 제어자(access modifier)

## 개요

타입스크립트는 자바스크립트에 타입 시스템을 도입한 언어로, 클래스 기반 객체 지향 프로그래밍에서도 강력한 기능을 제공합니다. 그중 하나가 **접근 제어자(Access Modifier)** 입니다. 
- 접근 제어자를 사용하면 클래스 내부의 필드나 메서드에 대한 접근 범위를 명확하게 지정할 수 있어, 객체의 캡슐화를 강화하고 코드의 안정성을 높이는 데 도움이 됩니다.
- 이 문서에서는 `public`, `private`, `protected` 세 가지 접근 제어자의 특징과 사용법을 예제와 함께 자세히 설명합니다.

---

## 접근 제어자 종류

- **public**: 어디서든 접근 가능 (기본값)
- **private**: 해당 클래스 내부에서만 접근 가능
- **protected**: 해당 클래스와 파생 클래스에서 접근 가능

#

### public

- 가장 기본적인 접근 제어자이며, 명시하지 않으면 기본적으로 `public`이다.
- 클래스 외부에서 자유롭게 필드나 메서드에 접근할 수 있다.

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
  
  const employee = new Employee("kwon", 25, "student");
  employee.name = "kim"; // 접근 가능
  employee.age = 30;     // 접근 가능
  employee.position = "디자이너"; // 접근 가능
  ```

> `public`은 생략해도 동일하게 동작하며, 다음과 같이 명시할 수도 있다:

```tsx
public name: string;
public age: number;
public position: string;
```

#

### private

- 클래스 내부에서만 접근 가능한 가장 제한적인 접근 제어자.
- 클래스 외부나 파생 클래스에서 접근 시 오류가 발생한다.

  ```tsx
  class Employee {
    private name: string;
    public age: number;
    public position: string;
  
    constructor(name: string, age: number, position: string) {
      this.name = name;
      this.age = age;
      this.position = position;
    }
  
    work() {
      console.log(`${this.name} working`); // 내부에서는 접근 가능
    }
  }
  
  const employee = new Employee("kwon", 25, "student");
  employee.name = "kim"; // ❌ 오류 발생
  employee.age = 30;      // ✅ 가능
  employee.position = "디자이너"; // ✅ 가능
  ```

#### 파생 클래스에서의 제한

- 파생 클래스에서도 private 필드는 접근이 불가하다.
  ```tsx
  class ExecutiveOfficer extends Employee {
    officeNumber: number;
  
    constructor(name: string, age: number, position: string, officeNumber: number) {
      super(name, age, position);
      this.officeNumber = officeNumber;
    }
  
    func() {
      // this.name; // ❌ 오류: private은 파생 클래스에서도 접근 불가
    }
  }
  ```

#

### protected

- 클래스 외부에서는 접근할 수 없지만, 파생 클래스에서는 접근이 가능하다.

```tsx
class Employee {
  private name: string;
  protected age: number;
  public position: string;

  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }

  work() {
    console.log(`${this.name} working`);
  }
}

class ExecutiveOfficer extends Employee {
  officeNumber: number;

  constructor(name: string, age: number, position: string, officeNumber: number) {
    super(name, age, position);
    this.officeNumber = officeNumber;
  }

  func() {
    // console.log(this.name); // ❌ 오류: private은 접근 불가
    console.log(this.age);     // ✅ protected는 접근 가능
  }
}
```

---
## 접근 제어자 활용 - (접근 제어자 + 생성자 매개변수)

### 생성자 매개변수에 접근 제어자 사용

- 생성자 매개변수 앞에 접근 제어자를 붙이면, 해당 매개변수는 자동으로 **필드로 선언**되고 **초기화**된다.
- 따라서 필드 정의와 초기화 코드를 생략할 수 있다.

  ```tsx
  class Employee {
    constructor( // 생성자 매개변수
      private name: string,
      protected age: number,
      public position: string
    ) {}
  
    work() {
      console.log(`${this.name} working`);
    }
  }
  
  const employee = new Employee("kwon", 25, "student");
  employee.position = "디자이너"; // public은 접근 가능
  // employee.name = "kim"; // ❌ private은 접근 불가
  ```

### 동작 방식 설명

- 생성자 매개변수에 접근 제어자를 붙이면 아래와 같은 필드 선언과 초기화 작업을 자동으로 수행한다.

  ```tsx
  // 아래 코드는 위 생성자 문법과 동일한 역할을 한다
  class Employee {
    private name: string;
    protected age: number;
    public position: string;
  
    constructor(name: string, age: number, position: string) {
      this.name = name;
      this.age = age;
      this.position = position;
    }
  }
  ```

---

## 요약 🚀

| 제어자     | 접근 가능 범위                                 |
|------------|----------------------------------------------|
| `public`   | 어디서든 접근 가능 (기본값)                     |
| `private`  | 해당 클래스 내부에서만 접근 가능               |
| `protected`| 해당 클래스 및 파생 클래스에서 접근 가능        |

⭐️ 접근 제어자를 통해 클래스의 내부 구현을 외부로부터 보호하고, 유지 보수성과 재사용성을 높일 수 있습니다. 상황에 따라 적절한 제어자를 선택해 사용하는 것이 중요합니다.

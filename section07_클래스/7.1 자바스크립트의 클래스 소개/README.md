# 타입스크립트에서 자바스크립트의 클래스를 사용하는 방법

## ✅ 실습 환경 오류 해결

### 문제 상황

- `src/chapter0.js` 파일 생성 시 `tsconfig.json`에 오류 발생
- 이유: `tsconfig.json`의 `include` 설정에 따라 타입스크립트가 해당 폴더 안의 파일들을 검사함
- `src` 폴더 안에 있는 `.js` 파일이 타입스크립트가 검사 대상에 포함되었기 때문

<br />

### 해결 방법

```json
{
  "compilerOptions": {
    "allowJs": true // 자바스크립트 파일도 허용
  }
}
```

- `allowJs` 옵션을 `true`로 설정하면 `.js` 파일도 타입스크립트가 허용하고 컴파일 가능해짐

---

## 클래스란?

- **클래스(class)** 는 **객체를 생성하기 위한 템플릿(틀)** 이다.
- 자바스크립트에서는 클래스 문법을 통해 동일한 구조의 객체를 쉽게 만들 수 있다.
- 클래스는 **객체를 생성해주는 설계도** 역할을 한다.

---

## 클래스 기본 구성

### 1. 클래스 선언

```js
class Student {}
```

- 클래스 이름은 **파스칼 케이스(PascalCase)** 로 작성

<br />

### 2. 필드 선언
> #### 필드란?
> - 클래스가 만들어낼 객체 프로퍼티를 의미한다.
> - 어떤 모양의 객체를 찍어낼지 필드에 정의해주면 된다.

```js
class Student {
  name;
  grade;
  age;
}
```

- 필드는 클래스가 만들어낼 객체의 속성(property)을 의미

<br />

### 3. 생성자 (Constructor)
> #### 생성자란?
> - 클래스를 호출하면 실제로 객체를 생성하는 역할을 하는 함수(메서드)이다.
> - 메서드의 이름을 constructer라고 하면 해당 메서드가 생성자된다.

```js
class Student {
  name;
  grade;
  age;

  constructor(name, grade, age) {
    this.name = name;
    this.grade = grade;
    this.age = age;
  }
}
```

- `constructor()`는 클래스가 호출될 때 실행되는 함수로, 객체의 초기값 설정에 사용됨
- `this`는 **현재 생성 중인 인스턴스를 가리킴**

<br />

### 4. 메서드 정의

```js
class Student {
  name;
  grade;
  age;

  constructor(name, grade, age) {
    this.name = name;
    this.grade = grade;
    this.age = age;
  }

  study() {
    console.log("공부하기");
  }

  introduce() {
    console.log(`hello ${this.name}`);
  }
}
```
#### 주의사항 🚨
  - 클래스 내부에서 정의된 함수는 자동으로 메서드로 처리됨
  - 객체 리터럴과 달리 **메서드 사이에 쉼표를 찍지 않음**

#

## 인스턴스 생성
> #### 인스턴스
> - 클래스를 이용해서 만든 객체를 인스턴스라고 한다.
```js
const studentA = new Student("kwon", "A+", 25);
studentA.study();      // 공부하기
studentA.introduce();  // hello kwon
```

- `new` 키워드를 사용해 클래스로부터 객체(인스턴스)를 생성

---

## 🔁 중복 코드 개선 - 클래스 상속

### 문제점

```js
class StudentDeveloper {
  name;
  grade;
  age;
  favoriteSkill;

  constructor(name, grade, age, favoriteSkill) {
    this.name = name;
    this.grade = grade;
    this.age = age;
    this.favoriteSkill = favoriteSkill;
  }

  study() {
    console.log("공부하기");
  }

  introduce() {
    console.log(`hello ${this.name}`);
  }

  programming() {
    console.log(`${this.favoriteSkill}로 프로그래밍 함`);
  }
}
```

- `StudentDeveloper` 클래스는 `Student` 클래스와 중복되는 필드와 메서드가 존재

<br />

### ✅ 해결: 클래스 상속 (`extends`)

```js
class StudentDeveloper extends Student {
  // 필드
  favoriteSkill;

  // 생성자
  constructor(name, grade, age, favoriteSkill) {
    super(name, grade, age); // 부모 클래스 생성자 호출
    this.favoriteSkill = favoriteSkill;
  }

  // 메서드
  programming() {
    console.log(`${this.favoriteSkill}로 프로그래밍 함`);
  }
}
```

- `extends`를 사용하면 기존 클래스를 상속받아 재사용 가능
- `super()`는 부모 클래스의 생성자를 호출

#### super 함수
- `super` 함수로 호출 시 부모 클래스(슈퍼 클래스)의 생성자가 호출이 된다.

<br />

### 예시 실행

```js
const dev = new StudentDeveloper("kwon", "A", 25, "TypeScript");
dev.introduce(); // hello kwon
dev.programming(); // TypeScript로 프로그래밍 함
```

---

## 🔍 정리

| 개념 | 설명 |
|------|------|
| 클래스 | 객체 생성을 위한 템플릿 |
| 필드 | 객체가 가질 속성 |
| 생성자 | 객체 초기화 함수 |
| 메서드 | 객체가 수행할 기능 정의 |
| 인스턴스 | 클래스로부터 만들어진 객체 |
| 상속 | 기존 클래스를 재사용하여 새로운 클래스를 만드는 방식 |
| `super()` | 부모 클래스의 생성자를 호출할 때 사용 |

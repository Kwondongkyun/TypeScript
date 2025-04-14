# 타입스크립트: 인터페이스와 클래스 함께 사용하기

TypeScript에서는 **인터페이스(interface)** 를 사용하여 클래스가 따라야 할 구조(설계도)를 정의할 수 있다.  
이렇게 하면 클래스가 일정한 규칙을 따르도록 강제할 수 있어, 유지보수나 협업에 매우 유리하다.

---

## 1. 인터페이스 정의

- 인터페이스는 클래스가 가져야 할 **프로퍼티와 메서드의 타입**을 명시한다.

  ```tsx
  interface CharacterInterface {
    name: string;
    moveSpeed: number;
    move(): void;
  }
  ```

  ➡️ 이 인터페이스는 `name`과 `moveSpeed`라는 필드를 가지고, `move`라는 메서드를 반드시 구현해야 한다는 규칙을 정한다.

#

## 2. 클래스에서 인터페이스 구현 (`implements`)

- 클래스가 인터페이스를 **구현(implements)** 하면, 해당 인터페이스에서 요구하는 구조를 반드시 따라야 한다.

  ```tsx
  class Character implements CharacterInterface {
    name: string;
    moveSpeed: number;
  
    constructor(name: string, moveSpeed: number) {
      this.name = name;
      this.moveSpeed = moveSpeed;
    }
  
    move() {
      console.log(`${this.moveSpeed} 속도로 이동`);
    }
  }
  ```

  - `Character` 클래스는 `CharacterInterface`에서 요구한 필드와 메서드를 모두 구현했다.
  - 그렇지 않으면 TypeScript는 컴파일 에러를 발생시킨다.

#

## 3. 생성자 매개변수에 접근 제어자 붙이기

- 생성자에 접근 제어자(`public`, `private`, `protected`)를 붙이면 **자동으로 필드가 생성되고 초기화**된다.

  ```tsx
  class Character implements CharacterInterface {
    constructor(public name: string, public moveSpeed: number) {}
  
    move() {
      console.log(`${this.moveSpeed} 속도로 이동`);
    }
  }
  ```

  ➡️ 이 방식은 코드를 더 간결하게 만들어준다.

#

## 4. 인터페이스 + 클래스: private 필드 사용하기

- 인터페이스는 **`public` 필드만 정의**할 수 있다.  
- `private`이나 `protected` 필드가 필요할 경우, 클래스에서 직접 따로 정의해야 한다.

  ```tsx
  class Character implements CharacterInterface {  
    constructor(
      public name: string,
      public moveSpeed: number,
      private extra: string // 인터페이스에 정의되지 않은 private 필드
    ) {}
  
    move() {
      console.log(`${this.name}이(가) ${this.moveSpeed} 속도로 이동 (extra: ${this.extra})`);
    }
  }
  ```

#

## ✅ 예시 실행

```tsx
const hero = new Character("용사", 10, "파워업 상태");
hero.move(); // 출력: 용사이(가) 10 속도로 이동 (extra: 파워업 상태)
```

---

## 💡 정리

| 요소 | 인터페이스 | 클래스 |
|------|-------------|--------|
| 사용 목적 | 구조(설계도) 정의 | 실제 구현 |
| 필드 접근 제한자 | `public`만 가능 | `public`, `private`, `protected` 모두 사용 가능 |
| 메서드 구현 여부 | 선언만 함 | 실제 구현해야 함 |
| 사용 키워드 | `interface` | `class implements` |

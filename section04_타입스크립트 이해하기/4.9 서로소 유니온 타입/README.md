# 서로소 유니온 타입 (Disjoint Union Types)

## 1. 개념

서로소 유니온 타입이란, 타입을 좁히기(narrowing)할 때 더 직관적이고 안전하게 사용할 수 있도록 설계된 객체 타입이다. 서로소 관계에 있는 집합(즉, 공통 원소가 없는 집합)으로 이루어진 유니온 타입을 의미한다.

### ✅ 서로소 집합이란?
- 두 개 이상의 집합이 공통 원소(교집합)를 갖지 않는 상태를 의미한다.
- 예를 들어, `string`과 `number` 타입은 서로소 관계이다.

### ✅ 서로소 유니온 타입이란?
- 서로소 집합을 기반으로 만든 유니온 타입이다.
- 특정 프로퍼티(주로 `tag` 또는 `type` 같은 식별자)를 추가하여 각 타입을 구분한다.

<br />

## 2. 왜 사용할까?

- 서로소 유니온 타입을 활용하면 타입 좁히기가 더 명확하고 직관적이 된다. 예를 들어, 웹서비스에서 회원의 유형을 관리하는 경우를 살펴보자.

<br />

## 3. 예제: 웹서비스 회원 관리

### ❌ 기존 방식 (직관적이지 않음)
```tsx
// 회원 타입 정의
type Admin = {
  name: string;
  kickCount: number;
};

type Member = {
  name: string;
  point: number;
};

type Guest = {
  name: string;
  visitCount: number;
};

type User = Admin | Member | Guest;

function login(user: User) {
  if ("kickCount" in user) {
    console.log(`${user.name}님, ${user.kickCount}명 강퇴했습니다.`);
  } else if ("point" in user) {
    console.log(`${user.name}님, ${user.point}포인트 보유 중입니다.`);
  } else {
    console.log(`${user.name}님, ${user.visitCount}번 방문하셨습니다.`);
  }
}
```

**🚨 문제점**
- 특정 프로퍼티(`kickCount`, `point`, `visitCount`)가 존재하는지 여부로 타입을 좁혀야 한다.
- 직관적이지 않으며, 유지보수가 어렵다.

#

### ✅ 개선: 서로소 유니온 타입 활용

```tsx
// 회원 타입 정의

type Admin = {
  tag: "ADMIN";
  name: string;
  kickCount: number;
};

type Member = {
  tag: "MEMBER";
  name: string;
  point: number;
};

type Guest = {
  tag: "GUEST";
  name: string;
  visitCount: number;
};

type User = Admin | Member | Guest;

function login(user: User) {
  switch (user.tag) {
    case "ADMIN":
      console.log(`${user.name}님, ${user.kickCount}명 강퇴했습니다.`);
      break;
    case "MEMBER":
      console.log(`${user.name}님, ${user.point}포인트 보유 중입니다.`);
      break;
    case "GUEST":
      console.log(`${user.name}님, ${user.visitCount}번 방문하셨습니다.`);
      break;
  }
}
```

**✅ 개선된 점**
- `tag` 필드를 활용해 각 타입을 구별 → 코드의 가독성이 향상됨
- `switch`문을 사용하여 더 명확하게 타입을 좁힐 수 있음
- 새로운 타입이 추가될 경우 유지보수가 더 쉬움

<br />

## 4. 서로소 유니온 타입의 원리

- 서로소 유니온 타입은 `tag` 프로퍼티가 각각 **문자열 리터럴 타입**으로 지정되었기 때문에, 각 타입의 교집합이 `never`(공집합)이다. 즉, `Admin & Member` 같은 교집합을 만들 수 없다.

<br />

## 5. 추가 예제: 비동기 작업 처리

- 비동기 작업의 상태를 관리하는 경우에도 서로소 유니온 타입을 활용하면 깔끔한 코드를 작성할 수 있다.

  ```tsx
  type LoadingTask = {
    state: "LOADING";
  };
  
  type FailedTask = {
    state: "FAILED";
    error: {
      message: string;
    };
  };
  
  type SuccessTask = {
    state: "SUCCESS";
    response: {
      data: string;
    };
  };
  
  type AsyncTask = LoadingTask | FailedTask | SuccessTask;
  
  function processResult(task: AsyncTask) {
    switch (task.state) {
      case "LOADING":
        console.log("로딩 중...");
        break;
      case "FAILED":
        console.log(`에러 발생: ${task.error.message}`);
        break;
      case "SUCCESS":
        console.log(`성공: ${task.response.data}`);
        break;
    }
  }
  ```

**✔️ 장점**
- `state` 값으로만 타입을 좁힐 수 있어 가독성이 좋다.
- 새 상태가 추가될 경우 `switch` 문에서 누락된 케이스를 쉽게 찾을 수 있다.

<br />

## 6. 정리

✔ 서로소 유니온 타입은 **객체 타입을 명확하게 구분**하고 **안전한 타입 좁히기**를 가능하게 한다.
✔ `tag`(혹은 `state` 같은 식별자)를 추가하여 서로소 관계를 만들어야 한다.
✔ `switch` 문을 사용하면 가독성이 좋고, 새로운 타입이 추가될 때 유지보수가 용이하다.


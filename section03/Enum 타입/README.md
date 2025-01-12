# 열거형 타입(Enumerable Type)

- 여러 값에 각각 이름을 부여해 열거하는 타입으로, 코드의 가독성과 유지보수성을 높여줍니다.
- **타입스크립트**에만 있는 기능으로, **자바스크립트에는 존재하지 않습니다.**

#

## **`enum` 타입이 필요한 이유**

```tsx
const user1 = {
  name: "kwon",
  role: 0, // 0: 관리자
};
const user2 = {
  name: "홍길동",
  role: 1, // 1: 일반 유저
};
const user3 = {
  name: "park",
  role: 2, // 2: 게스트
};
```

- 숫자로 역할(권한)을 설정하면, 시간이 지나면 숫자가 의미하는 바를 잊기 쉽습니다.  
- **해결책:** `enum` 타입을 사용해 의미를 명확히 표현합니다.

# 

## **`enum` 타입 사용 예시**

```tsx
enum Role {
  ADMIN = 0,
  USER = 1,
  GUEST = 2,
}

const user1 = {
  name: "kwon",
  role: Role.ADMIN, // 0: 관리자
};
const user2 = {
  name: "홍길동",
  role: Role.USER, // 1: 일반 유저
};
const user3 = {
  name: "park",
  role: Role.GUEST, // 2: 게스트
};

console.log(user1, user2, user3);
```

**출력 결과:**

```bash
{ name: 'kwon', role: 0 } 
{ name: '홍길동', role: 1 } 
{ name: 'park', role: 2 }
```

**장점:**  
- 숫자로 역할을 표현할 때의 혼란을 방지하고, 코드의 가독성을 크게 높입니다.

# 

## **숫자 할당과 자동 증가**

### **자동으로 숫자 할당**
- 숫자를 직접 설정하지 않으면 **0부터 자동으로 증가**합니다.

  ```tsx
  enum Role {
    ADMIN, // 0
    USER,  // 1
    GUEST, // 2
  }
  ```

### **숫자 시작값 지정**
- 첫 번째 값에 숫자를 명시하면, 이후 값은 자동으로 증가합니다.

  ```tsx
  enum Role {
    ADMIN = 10, 
    USER,  // 11
    GUEST, // 12
  }
  ```

### **중간값 변경**
- 특정 값만 수정하면 이후 값은 그 값부터 자동으로 증가합니다.

  ```tsx
  enum Role {
    ADMIN,    // 0
    USER = 10,
    GUEST,    // 11
  }
  ```

**출력 결과:**

```bash
{ name: 'kwon', role: 0 } 
{ name: '홍길동', role: 10 } 
{ name: 'park', role: 11 }
```

# 

## **문자열 값을 갖는 `enum`**

- `enum` 멤버에 **문자열 값**도 할당 가능합니다.

  ```tsx
  enum Language {
    KOREAN = "ko",
    ENGLISH = "en",
  }
  
  const user1 = {
    name: "kwon",
    role: Role.ADMIN,
    language: Language.KOREAN,
  };
  const user2 = {
    name: "홍길동",
    role: Role.USER,
    language: Language.ENGLISH,
  };
  const user3 = {
    name: "park",
    role: Role.GUEST,
    language: Language.KOREAN,
  };
  
  console.log(user1, user2, user3);
  ```

**출력 결과:**

```bash
{ name: 'kwon', role: 0, language: 'ko' } 
{ name: '홍길동', role: 10, language: 'en' } 
{ name: 'park', role: 11, language: 'ko' }
```

# 

## **컴파일 결과: `enum`의 변환**

타입스크립트의 `enum`은 **컴파일 결과로 자바스크립트 객체로 변환**됩니다.

### **타입스크립트 코드**

```tsx
enum Role {
  ADMIN,
  USER = 10,
  GUEST,
}

enum Language {
  KOREAN = "ko",
  ENGLISH = "en",
}
```

<br />

### **컴파일된 자바스크립트 코드**

```javascript
var Role;
(function (Role) {
  Role[(Role["ADMIN"] = 0)] = "ADMIN";
  Role[(Role["USER"] = 10)] = "USER";
  Role[(Role["GUEST"] = 11)] = "GUEST";
})(Role || (Role = {}));

var Language;
(function (Language) {
  Language["KOREAN"] = "ko";
  Language["ENGLISH"] = "en";
})(Language || (Language = {}));
```

**변환 결과:**
- `Role`과 `Language`는 **객체로 변환**되어, 실행 시점에 접근할 수 있습니다.

# 

### **요약**

#### **`enum`의 장점**:
- 역할을 명확히 구분하고, 숫자값의 의미를 쉽게 이해할 수 있습니다.
- 자동으로 숫자를 할당하거나, 원하는 값을 지정할 수 있습니다.
- 문자열 값도 할당 가능해, 더 직관적으로 표현할 수 있습니다.

#### **`enum`은 자바스크립트 객체로 변환**되므로, 런타임에서도 활용 가능합니다.

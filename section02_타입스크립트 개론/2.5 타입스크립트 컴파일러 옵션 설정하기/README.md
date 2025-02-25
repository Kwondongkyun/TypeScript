# 컴파일러 옵션

컴파일 과정에서 세부적인 사항들을 조정하는 설정을 **컴파일러 옵션**이라고 한다. 예를 들어:
- 타입 오류를 얼마나 엄격하게 검사할 것인지
- 컴파일 후 생성되는 자바스크립트 코드의 버전
- 모듈 시스템 방식

➡️ 타입스크립트는 다른 언어에 비해 컴파일러 옵션을 매우 자유롭고 쉽게 설정할 수 있다.

# 

## 타입스크립트 컴파일러 옵션 설정하기

- 타입스크립트에서는 프로젝트 단위(`Node.js` 패키지 단위)로 컴파일러 옵션을 설정할 수 있다. 
- 이를 위해 `tsc`(TypeScript Compiler) 도구를 이용하면 기본적인 옵션이 자동으로 설정된 `tsconfig.json` 파일을 생성할 수 있다.

  ```bash
  tsc --init
  ```

➡️ 실행 결과:

  ```plaintext
  Created a new tsconfig.json with:
  
    target: es2016
    module: commonjs
    strict: true
    esModuleInterop: true
    skipLibCheck: true
    forceConsistentCasingInFileNames: true
  ```

### `tsconfig.json` (TypeScript Configuration)
타입스크립트 컴파일러의 설정을 담고 있는 파일로, 다양한 옵션을 설정할 수 있다.

---

# 주요 옵션

## `include` 옵션

- `tsc`가 컴파일할 타입스크립트 파일들의 범위와 위치를 지정하는 옵션이다.

### 기존 방식

```bash
tsc src/index.ts  # 개별 파일을 직접 지정
```
➡️ 만약 100개의 파일을 컴파일해야 한다면 매우 번거롭다.<br />
➡️ 이를 해결하기 위해 `include` 옵션을 사용하면 특정 폴더 안의 모든 파일을 한 번에 컴파일할 수 있다.

<br />

**`tsconfig.json` 설정:**

```json
{
  "include": ["src"]
}
```

➡️ 이렇게 설정하면 `tsc` 명령어만 입력해도 `src` 디렉터리 안의 모든 파일이 자동으로 컴파일된다.

  ```bash
  tsc  # src 디렉터리 안의 모든 파일 컴파일
  ```

#

## `target` 옵션

- 컴파일 후 생성되는 자바스크립트 코드의 버전을 설정하는 옵션이다.

<br />

### 예시 1) `target: ES5`
- ES6 버전에서 추가된 화살표 함수
  ```json
  {
    "compilerOptions": {
      "target": "ES5"
    }
  }
  ```


<br />

- **`index.ts`**
  ```tsx
  const func = () => console.log("Hello");
  ```

<br />

- **컴파일 후 (`index.js`)**
  ```js
  var func = function () { return console.log("Hello"); };
  ```

  ➡️ ES5에는 화살표 함수가 없으므로, 함수 표현식으로 변환된다.

<br />

### 예시 2) `target: ESNext`
- ES6 버전에서 추가된 화살표 함수
  ```json
  {
    "compilerOptions": {
      "target": "ESNext"
    }
  }
  ```

<br />

- **컴파일 후 (`index.js`)**
  ```js
  const func = () => console.log("Hello");
  ```
- 이 경우, 화살표 함수가 그대로 유지된다.

# 

## `module` 옵션

- 변환되는 자바스크립트 코드의 모듈 시스템을 설정하는 옵션이다.

- **CommonJS(CJS)**: Node.js에서 사용하는 모듈 시스템
- **ES 모듈(ESM)**: 최신 자바스크립트 표준 모듈 시스템

<br />

### 예시 1) `module: CommonJS`

- **`tsconfig.json` 모듈 시스템 : `CommonJs`**
  ```json
  {
    "compilerOptions": {
      "module": "CommonJS"
    }
  }
  ```

- **`index.ts`**
  ```ts
  import { hello } from "./hello";
  
  hello();
  ```

- **컴파일 결과:**
  ```js
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  const hello_1 = require("./hello");
  (0, hello_1.hello)();
  ```

<br />

### 예시 2) `module: ESNext`

- **`tsconfig.json`**
  ```json
  {
    "compilerOptions": {
      "module": "ESNext"
    }
  }
  ```

- **`index.ts`**
  ```
  import { hello } from "./hello";
  
  hello();
  ```

- **컴파일 결과:**
  ```js
  import { hello } from "./hello";
  hello();
  ```

# 

## `outDir` 옵션

- 컴파일 후 생성된 자바스크립트 파일이 저장될 디렉터리를 지정하는 옵션이다.
- 컴파일 결과로 생성되는 코드를 우리가 작성하는 코드를 우리가 작성하는 코드 영역에서 분리할 수 있다.

**`tsconfig.json` 설정:**
```json
{
  "compilerOptions": {
    "outDir": "dist"
  }
}
```
<img width="250" alt="outDir 옵션 이미지" src="https://github.com/user-attachments/assets/2537d0ea-fd53-4945-ab23-67846a698d3d" />

➡️ 이렇게 설정하면 `src` 디렉터리의 타입스크립트 파일이 `dist` 디렉터리 안에 변환된 자바스크립트 코드로 저장된다.

```bash
tsc  # 컴파일 결과물은 dist 디렉터리에 생성됨
```

#

## `strict` 옵션

타입스크립트가 타입 검사를 얼마나 엄격하게 수행할지를 설정하는 옵션이다.

### 예시

- **`hello.ts` (오류 발생)**
  ```tsx
  export const hello = (message) => {
    console.log("hello" + message);
  };
  ```

- **`tsconfig.json`**
  ```json
  {
    "compilerOptions": {
      "strict": true
    }
  }
  ```

`strict: true` 설정 시 오류 발생:
- 함수의 매개변수 `message`에 타입이 명시되지 않았기 때문
- 타입스크립트에서는 매개변수(message)들의 타입은 프로그래머가 직접 지정하도록 권장

- **수정 방법:**
  ```tsx
  export const hello = (message: string) => {
    console.log("hello" + message);
  };
  ```

---

## 정리

타입스크립트의 주요 컴파일러 옵션:

| 옵션 | 설명 |
|---|---|
| `include` | 컴파일할 파일들의 범위를 지정 |
| `target` | 컴파일 후 생성될 자바스크립트 버전 설정 |
| `module` | 모듈 시스템 설정 (CommonJS, ESNext 등) |
| `outDir` | 컴파일된 파일이 저장될 디렉터리 지정 |
| `strict` | 타입 검사 수준 설정 |

`tsconfig.json`을 활용하면 프로젝트의 요구사항에 맞게 타입스크립트 설정을 쉽게 조정할 수 있다.


### 1. Node.js 패키지를 초기화 명령

```bash
npm init
```

→ `package.json` 파일 생성

<br />

```json
{
  "name": "section1",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

- `package.json`은 프로젝트의 메타데이터를 담고 있으며, 의존성 관리 및 스크립트 실행을 위한 설정 정보를 포함한다.

#

### 2. @types/node 패키지 설치

- `node.js`가 제공하는 내장 기능들에 대한 타입 정보를 갖고 있다.

    ```bash
    npm install @types/node
    ```
    → `node_modules` 폴더와 `package-lock.json` 파일 생성

<br />
    
- `package.json` 파일

    ```json
    {
      "name": "section1",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC",
      "dependencies": {
        "@types/node": "^22.13.5"
      }
    }
    ```

- 이 패키지는 TypeScript가 Node.js의 내장 모듈을 이해할 수 있게 도와준다.

# 

### 3. TypeScript 컴파일러 설치

```bash
npm install typescript -g
```

<aside>

> #### `-g`
> : 글로벌로 설치 시 우리 컴퓨터의 모든 디렉터리에서 이 패키지를 사용할 수 있다.

</aside>

- `mac`일 경우

    ```bash
    sudo npm install typescript -g
    ```

    ➡️ 설치 후 TypeScript 컴파일러를 사용할 수 있다. (명령어 : `tsc`)

#

### 4. TypeScript 코드 작성해보기

- `src/index.ts`

    ```tsx
    console.log("Hello TypeScript");
    const a: number = 1;
    ```

  ➡️ 컴파일해보기(TypeScript 컴파일러(`tsc`) 이용)

    ```bash
    tsc src/index.ts
    ```

  ➡️ `src/index.js` 파일이 생성

- `src/index.js`
    - 위에서 만든 TypeScript 코드(`src/index.ts`)를 컴파일한 결과로 생성된 JavaScript 코드이다.

      ```jsx
      console.log("Hello TypeScript");
      var a = 1;
      ```

    - 타입 관련 코드(`number`)는 JavaScript에서 제거되며, 결과적으로 실행에 필요한 코드만 남는다.

#

### 5. 컴파일된 JavaScript 코드 실행해보기

```bash
node src/index.js

>> Hello TypeScript
```

➡️ 컴파일된 JavaScript 코드를 Node.js로 실행하여 결과를 확인할 수 있다.

---

### `ts-node`

: TypeScript와 Node.js를 함께 사용할 수 있는 도구로, TypeScript 파일을 직접 실행할 수 있게 해준다.

```bash
sudo npm install ts-node -g
```

```bash
ts-node src/index.ts
```

➡️ 오류 발생 , Node.js 20 버전 이상에서 `ts-node`가 더 이상 동작하지 않음.

<aside>

⭐️  `ts-node`는 Node.js 20 버전 이상에서 동작하지 않으며, 2023년 10월 Node.js의 LTS(장기 지원 버전)가 20대로 업데이트되었기 때문에 `tsx`로 대체해야 함.

</aside>

---

### **`tsx` (TypeScript Execute)**

```bash
sudo npm install -g tsx
```

```bash
tsx -v

>> tsx v4.19.3
>> node v20.10.0
```

### 실행해보기

```bash
tsx src/index.ts

>> Hello TypeScript
```

→ `tsx`를 사용하면 TypeScript 파일을 즉시 실행할 수 있어, 개발 과정에서 빠른 피드백을 받을 수 있다.

---

# 대부분의 프로그래밍 언어는 어떻게 동작할까?
<img width="600" alt="프로그래밍 동작 이미지" src="https://github.com/user-attachments/assets/632b56b1-a2a2-4b3f-843c-88bcbc84a6af" />

- 프로그래밍 언어는 기본적으로 사람이 이해하기 쉬운 **고수준 언어**로 작성되지만, 컴퓨터는 **기계어(이진수)** 만 이해할 수 있다.
- 따라서, 우리가 작성한 코드를 컴퓨터가 이해할 수 있도록 변환하는 과정이 필요하다.

<br />

<img width="540" alt="컴파일 과정" src="https://github.com/user-attachments/assets/e0444173-32d6-4841-a339-71813bbd75e4" />

### 1. 컴파일 과정
- **컴파일러(Compiler)** 는 고수준 언어로 작성된 코드를 컴퓨터가 실행할 수 있는 **바이트 코드 또는 기계어**로 변환하는 역할을 합니다.
- 예를 들어, Java는 **JVM 바이트코드**로 변환되고, C/C++은 **바로 기계어**로 변환된다.

### 2. 컴파일 과정 상세
1. **코드를 분석하여 AST(Abstract Syntax Tree, 추상 구문 트리)로 변환**
   <img width="300" alt="AST 추상 문법 트리" src="https://github.com/user-attachments/assets/08b73086-1f14-40db-a2b2-7745fc6bb58b" />
   - 코드에서 불필요한 공백, 주석 등을 제거하고, 트리 형태의 데이터 구조로 변환
   - 코드의 구조와 의미를 파악하기 쉽게 만듦

2. **AST를 바이트코드 또는 기계어로 변환**
   - 바이트코드는 JVM(Java Virtual Machine) 같은 실행 환경에서 해석됨
   - C/C++ 같은 언어는 기계어로 직접 변환되어 실행
  
### 3. 정리
<img width="605" alt="js 컴파일 과정" src="https://github.com/user-attachments/assets/a1857f3e-bcd2-4d88-8a5c-c29d9fb32772" />

1. 먼저 코드를 컴파일러가 AST로 변환한다.
2. AST는 다시 바이트 코드로 변환된다.
3. 변환이 된 바이트 코드를 컴퓨터가 실행하게 된다.

---

## TypeScript는 어떻게 실행될까?
TypeScript는 JavaScript의 상위 집합으로, **컴파일 단계에서 타입을 검사하고, JavaScript 코드로 변환(트랜스파일)** 합니다.

### TypeScript의 컴파일 과정
<img width="540" alt="타입스크립트의 컴파일 과정" src="https://github.com/user-attachments/assets/b9bd5044-ee72-4e6a-8789-ad6b974cd936" />

1. **TypeScript 코드를 AST로 변환**
   - JavaScript와 동일하게 AST를 생성하여 코드 구조를 분석

2. **타입 검사 수행**
   - TypeScript의 가장 큰 특징인 **정적 타입 검사**를 진행
   - 타입 오류가 있으면 컴파일러(tsc)가 경고를 발생시킴

3. **JavaScript 코드로 변환 (Transpiling)**
   <img width="530" alt="타입스크립트 컴파일 과정" src="https://github.com/user-attachments/assets/77314e12-3851-4c64-a9fe-fcfc3e7628c2" />
   - 최종적으로 TypeScript 코드를 **JavaScript 코드**로 변환
   - 브라우저나 Node.js에서 실행 가능
   - 타입 스크립트 코드를 컴파일 해서 생성한 자바스크립트 코드는 타입 검사를 통과한 자바스크립트 코드이다.<br />
     ➡️ 타입스크립트 코드의 컴파일 과정에 타입 검사가 포함되어 있기 때문이다.<br />
     ➡️ 타입 오류가 발생할 가능성이 낮은 안전한 자바스크립트 코드이다.

💡 TypeScript는 자체 실행 환경이 없고, JavaScript로 변환한 후 실행되기 때문에 **컴파일 언어라기보다는 트랜스파일러(Transpiler)를 사용하는 언어**로 볼 수 있습니다.
> #### 트랜스파일러(Transpiler)
> - 한 프로그래밍 언어로 작성된 코드를 다른 프로그래밍 언어로 변환하는 프로그램
> - 같은 수준의 프로그래밍 언어 사이에서 코드 변환을 수행

### 결과

<img width="600" alt="스크린샷 2025-01-07 23 25 56" src="https://github.com/user-attachments/assets/1081ff36-631c-4482-9c78-7c836f41f559" />

- 타입 오류가 없는 타입스크립트 코드는 컴파일 시 타입 검사를 통과해서 타입 관련 문법들은 삭제된 안전한 자바스크립트 코드로 변경된다.


---

## 요약
1. **일반 프로그래밍 언어(Java, C++)**
   - 코드를 **AST**로 변환 → **바이트 코드 또는 기계어**로 변환 → 컴퓨터가 실행

2. **TypeScript**
   - 코드를 **AST**로 변환 → **타입 검사** → **JavaScript로 변환** → 브라우저/Node.js에서 실행

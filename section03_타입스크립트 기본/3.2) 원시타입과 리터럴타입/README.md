# 원시 타입(Primitive Type)

: 하나의 값만 저장할 수 있는 타입

- `number`
- `string`
- `boolean`
- `null`
- `undefined`

#

## 1. `number` 타입

### 정의

- 숫자 값을 저장하는 타입으로, 정수와 실수, Infinity, NaN 등을 포함한다.

  ```tsx
  // number
  let num1: number = 123;
  let num2: number = -123;
  let num3: number = 0.123;
  let num4: number = -0.123;
  let num5: number = Infinity;
  let num6: number = -Infinity;
  let num7: number = NaN;
  ```

- `: number` : 타입 주석(Type Annotation)으로, 변수의 타입을 정의하는 문법이다.

### 오류 발생 경우

- 문자열을 할당할 경우
    ```tsx
    num1 = "hello"; // 오류 발생
    ```
    <img width="400" alt="문자열 할당" src="https://github.com/user-attachments/assets/8a09b505-9a30-41b7-a7f2-bb39c5970dc5" />

- `number` 타입이 아닌 메서드를 호출할 경우
    ```tsx
    num1.toUpperCase(); // 오류 발생
    ```
    <img width="400" alt="다른 타입 전용 메서드 사용" src="https://github.com/user-attachments/assets/56e71da4-3389-491e-8813-0ef7dac2aff8" />


#

## 2. `string` 타입

### 정의

- 문자열 값을 저장하는 타입

  ```tsx
  // string
  let str1: string = "hello";
  let str2: string = 'hello';
  let str3: string = `hello`;
  let str4: string = `hello ${num1}`; // 템플릿 리터럴
  ```

### 오류 발생 경우

- 숫자를 할당할 경우
    ```tsx
    str1 = 123; // 오류 발생
    ```
    <img width="400" alt="숫자 할당" src="https://github.com/user-attachments/assets/e1351c68-c3ed-4931-a5ca-8281e82ed689" />

- `string` 타입이 아닌 메서드를 호출할 경우
    ```tsx
    str1.toFixed(); // 오류 발생
    ```
    <img width="400" alt="다른 타입 전용 메서드 사용" src="https://github.com/user-attachments/assets/33e7f46d-2961-4560-a858-5e90c4a7a2fb" />


#

## 3. `boolean` 타입

### 정의

- `true` 또는 `false` 값만 저장할 수 있는 타입

  ```tsx
  // boolean
  let bool1: boolean = true;
  let bool2: boolean = false;
  ```

#

## 4. `null` 타입

### 정의

- `null` 값만 저장할 수 있는 타입
  
  ```tsx
  // null
  let null1: null = null;
  ```

#

## 5. `undefined` 타입

### 정의

- `undefined` 값만 저장할 수 있는 타입

  ```tsx
  // undefined
  let unde1: undefined = undefined;
  ```

#

## 6. 리터럴 타입

### 정의

- 특정한 하나의 값만 저장할 수 있는 타입

  ```tsx
  // 숫자 리터럴 타입
  let numA: 10 = 10;
  
  // 문자열 리터럴 타입
  let strA: "hello" = "hello";
  
  // 불리언 리터럴 타입
  let boolA: true = true;
  ```

- 변수의 타입을 값 자체로 정의한다.
- 정의된 값 이외의 다른 값을 할당할 경우 오류가 발생한다.
    ```tsx
    numA = 12; // 오류 발생
    ```

#

# 특이 사항

## 1. `null`을 임시로 사용해야 하는 경우

- `number` 타입 같은 변수에 임시로 `null` 값을 넣어야 할 경우
- `tsconfig.json` 설정에서 `"strictNullChecks": false` 로 변경하면 가능

### 예시

```tsx
let numA: number = null; // 정상 동작 (strictNullChecks: false 설정 시)
```

### `tsconfig.json` 설정 예시
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "skipLibCheck": true,
    "module": "ESNext",
    "outDir": "dist",
    "strict": true,
    "strictNullChecks": false,
    "moduleDetection": "force"
  },
  "include": ["src"]
}
```

## 2. `strictNullChecks` 옵션

### 정의
: `null` 값 할당을 엄격하게 검사하는 옵션

- 기본값: `"strictNullChecks": true`
- `false`로 설정 시 `null` 값을 할당할 수 있다.
    ```tsx
    let numA: number = null; // strictNullChecks: false 일 때만 가능
    ```

## 3. `strict` 옵션

: `strictNullChecks`를 포함한 여러 엄격한 타입 검사 옵션을 한 번에 활성화하는 설정

- `strict` 옵션이 활성화되면 `strictNullChecks`도 자동으로 활성화된다.


# 함수 타입 정의

## 함수란?

### 자바스크립트에서의 함수
- 매개변수를 받아 내부에서 연산을 수행한 후 결과값을 반환하는 문법

<br />

### 타입스크립트에서의 함수
- 매개변수와 반환값의 타입을 명확히 정의하는 문법
  
  ```tsx
  function func(a: number, b: number) {
    return a + b;
  }
  ```

# 

## 화살표 함수의 타입 정의

- 함수 선언식과 동일한 방식으로 타입을 정의할 수 있다.

  ```tsx
  const add = (a: number, b: number) => a + b;
  ```

<br />

## 함수의 매개변수

### 기본값을 설정한 매개변수
- 타입을 명시하지 않아도 기본값을 기준으로 타입이 자동 추론된다.

  ```tsx
  function introduce(name = "kwon") {
    console.log(`name : ${name}`);
  }
  ```

<br />

### 주의사항 🚨

1. **기본값과 다른 타입으로 매개변수 타입을 정의하면 오류 발생**
    
    ```tsx
    function introduce2(name: number = "kwon") { // 오류 발생
      console.log(`name : ${name}`);
    }
    ```
    
2. **자동 추론된 매개변수 타입과 다른 타입의 값을 전달하면 오류 발생**
    
    ```tsx
    introduce(1); // 오류 발생
    ```
    
# 

## 선택적 매개변수

- `?`를 사용하여 선택적 매개변수를 정의할 수 있다.
- 선택적 매개변수는 `undefined`를 포함한 유니온 타입으로 추론된다.

  ```tsx
  function introduce(name = "kwon", tall?: number) {
    console.log(`name : ${name}`);
    console.log(`tall : ${tall}`);
  }
  
  introduce("kwon");
  ```

### 주의사항 🚨

1. **선택적 매개변수는 연산 시 주의해야 한다.**
    - 선택적 매개변수는 `undefined`일 수 있으므로 연산 전에 타입을 확인해야 한다.
    
      ```tsx
      function introduce(name = "kwon", tall?: number) {
        console.log(`name : ${name}`);
        
        if (typeof tall === "number") {
          console.log(`tall : ${tall + 10}`);
        }
      }
      ```
<br />

2. **선택적 매개변수는 필수 매개변수보다 뒤에 위치해야 한다.**
    
    ```tsx
    function introduce(name = "kwon", tall?: number, age: number) { // 오류 발생
      console.log(`name : ${name}`);
      console.log(`tall : ${tall}`);
    }
    ```
    
    - 선택적 매개변수(`tall`)보다 필수 매개변수(`age`)가 뒤에 있기 때문에 오류가 발생한다.
    - 필수 매개변수를 앞에 배치해야 한다.
    
      ```tsx
      function introduce(name: string, age: number, tall?: number) {
        console.log(`name : ${name}, age: ${age}, tall: ${tall}`);
      }
      ```

#

## 나머지 매개변수 (Rest Parameter)

### `rest parameter` (`...rest`)
- 몇 개의 인자가 전달될지 모를 경우 `rest parameter`를 사용하여 가변적인 개수의 매개변수를 받을 수 있다.
- 전달된 값들은 배열로 묶여 `rest` 변수에 저장된다.

  ```tsx
  function getSum(...rest: number[]) {
    let sum = 0;
    rest.forEach((i) => (sum += i));
    return sum;
  }
  
  console.log(getSum(1, 2, 3)); // 6
  console.log(getSum(1, 2, 3, 4, 5)); // 15
  ```

<br />

### 나머지 매개변수의 개수 제한 (튜플 타입 사용)

- 고정된 개수의 인자를 받을 경우, 튜플 타입을 사용하면 된다.

  ```tsx
  function getTupleSum(...numbers: [number, number, number]) {
    return numbers.reduce((sum, num) => sum + num, 0);
  }

  console.log(getTupleSum(1, 2, 3)); // 6
  console.log(getTupleSum(1, 2)); // 오류 발생
  ```

# 타입스크립트에서 프로미스(Promise)의 타입 정의하는 방법

* 비동기 처리를 위한 `Promise`는 자바스크립트에서 필수적인 기능입니다.
* 타입스크립트에서는 `Promise` 객체의 타입을 명확히 정의해줘야 에러 없이 안전한 코드를 작성할 수 있습니다.

#

## 기본적인 Promise 사용

```tsx
const promise = new Promise((resolve, reject) => { 
  setTimeout(() => {
    resolve(20);
  }, 3000);
});

promise.then((response) => {
  console.log(response); // 20
});
```

* `Promise`는 자바스크립트의 내장 클래스이며, 생성자를 통해 인스턴스를 만듭니다.
* 생성자 인수는 실행자 함수 `(resolve, reject) => {}`로 비동기 작업을 수행합니다.

<br />

## 문제점: 타입 에러 발생

```tsx
promise.then((response) => {
  console.log(response * 10); 
  // ❌ 오류: 'response'는 'unknown' 형식입니다.
});
```

* 타입스크립트는 `resolve`를 통해 전달되는 값의 타입을 자동 추론하지 못해 기본적으로 `unknown`으로 처리합니다.
* `unknown`은 아무런 연산도 허용하지 않기 때문에 명시적 타입 지정이 필요합니다.

<br />

## 해결법: 제네릭으로 타입 명시

`Promise`는 타입스크립트에서 **제네릭 클래스**로 정의되어 있습니다.

```tsx
const promise = new Promise<number>((resolve, reject) => {
  setTimeout(() => {
    resolve(20);
  }, 3000);
});

promise.then((response) => {
  console.log(response * 10); // 200
});
```

* `new Promise<number>()`처럼 타입 변수를 명시하면, `resolve`에 전달되는 값의 타입을 알 수 있어 안정적인 코드를 작성할 수 있습니다.

<br />

> ## Promise의 타입 정의 살펴보기
> ```tsx
> interface Promise<T> {
>   finally(onfinally?: () => void): Promise<T>;
> }
> ```
> * `Promise<T>`는 제네릭 인터페이스이다.
> * `T`는 비동기 작업의 **성공 결과값의 타입**을 의미합니다.
>
> <br />
>
> ```tsx
> new <T>(
>   executor: (
>     resolve: (value: T | PromiseLike<T>) => void,
>     reject: (reason?: any) => void
>   ) => void
> ): Promise<T>;
> ```
> * 생성자는 타입 변수 `T`를 받아 `resolve(value: T)`와 연결합니다.
> * `reject`는 항상 `any` 타입으로 추론됩니다.

<br />

## 실패 처리 시 타입 문제

```tsx
const promise = new Promise<number>((resolve, reject) => {
  setTimeout(() => {
    reject("요청 실패");
  }, 3000);
});

promise.catch((err) => {
  if (typeof err === "string") {
    console.log(err); // 요청 실패
  }
});
```

* `reject`는 `any` 타입이라, `catch(err)`의 타입도 `any`입니다.
* 따라서 **타입 좁히기(type narrowing)** 를 사용해 실제 타입을 조건문으로 확인해야 합니다.

<br />

## 정리: 성공은 제네릭으로 타입 지정, 실패는 타입 좁히기로 대응

* 성공(`resolve`)의 결과값은 `Promise<T>`의 `T`로 타입을 지정 가능합니다.
* 실패(`reject`)의 인수는 `any` 타입으로, 타입 명시가 불가능하므로 타입 좁히기를 사용해야 합니다.

---

# 프로미스를 반환하는 함수 타입 정의

```tsx
function fetchPost() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        title: "게시글 제목",
        content: "게시글 컨텐츠",
      });
    });
  });
}

const postRequest = fetchPost();
postRequest.then((post) => {
  console.log(post.id); 
  // ❌ 오류: 'post'는 'unknown' 형식입니다.
});
```

### 원인

* `resolve({...})` 값의 타입이 추론되지 않기 때문에, 전체 결과는 `Promise<unknown>` 타입이 됩니다.

#

## 해결방안 1: `Promise<T>` 제네릭 지정

```tsx
interface Post {
  id: number;
  title: string;
  content: string;
}

function fetchPost() {
  return new Promise<Post>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        title: "게시글 제목",
        content: "게시글 컨텐츠",
      });
    });
  });
}
```

* 생성자 호출 시 `<Post>` 타입 지정으로 `resolve` 결과값의 타입을 명확히 지정

<br />

## 해결방안 2: 함수 반환값 타입 명시 (추천)

```tsx
function fetchPost(): Promise<Post> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        title: "게시글 제목",
        content: "게시글 컨텐츠",
      });
    });
  });
}
```

* 함수의 반환값을 `Promise<Post>`로 명시하면 코드만 봐도 어떤 값을 반환하는지 명확합니다.
* 협업 시 함수의 동작을 쉽게 파악할 수 있어 **가독성**이 뛰어납니다.

---

## 한눈에 보기: Promise와 제네릭 정리표

| 항목              | 설명                                          |
| --------------- | ------------------------------------------- |
| `Promise<T>`    | 제네릭 클래스, 성공 결과값 타입을 `T`로 지정                 |
| 타입 생략 시         | 성공 결과값은 `unknown`, 실패 결과값은 항상 `any`         |
| `resolve` 타입    | `T` 또는 `PromiseLike<T>`                     |
| `reject` 타입     | `any`, 타입 추론 불가                             |
| `catch` 처리      | 타입 좁히기로 실제 타입 확인                            |
| `Promise` 반환 함수 | `function foo(): Promise<T>` 형태로 명시하는 게 권장됨 |
| 추천 방식           | **함수 반환 타입을 명시해주는 것** (가독성, 협업 모두 좋음)       |

---

## 마무리

* `Promise`는 타입스크립트에서 제네릭을 활용해 성공 결과의 타입을 안전하게 지정할 수 있지만, `reject`에 대해서는 타입 제한이 없으므로 런타임에서 타입 좁히기가 필수다.
* `Promise`를 반환하는 함수의 타입을 명확히 작성하는 습관은 협업과 유지보수 측면에서 아주 유익하다.

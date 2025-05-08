/**
 * 프로미스
 */

import { resolve } from "path";

const promise = new Promise<number>((resolve, reject) => {
  setTimeout(() => {
    // resolve(20);
    reject("~~~ 실패");
  }, 3000);
});

// 결과값 이용
promise.then((response) => {
  console.log(response * 10);
});

promise.catch((err) => {
  if (typeof err === "string") {
    console.log(err);
  }
});

/**
 * 프로미스를 반환하는 함수의 타입 정의
 */

// 게시글 타입 정의
interface Post {
  id: number;
  title: string;
  content: string;
}

// 게시글 불러오기 함수
function fetchPost(): Promise<Post> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 임시 게시글 반환
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
  post.id;
});

// void
function func1(): string {
  return "hello";
}

function func2(): null {
  console.log("hello");
  return null;
}

// never
// 무한 루프를 도는 함수
function func3(): never {
  while (true) {}
}

function func4(): never {
  throw new Error();
}

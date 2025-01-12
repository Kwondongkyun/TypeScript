// void
function func1() {
  return "hello";
}
function func2() {
  console.log("hello");
  return null;
}
// never
// 무한 루프를 도는 함수
function func3() {
  while (true) {}
}
function func4() {
  throw new Error();
}
export {};

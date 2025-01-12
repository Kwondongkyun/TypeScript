// any
let anyVar = 10;
let num = 10;

num = anyVar;

// unknown
let unknownVar;

unknownVar = "";
unknownVar = 1;
unknownVar = () => {};

if (typeof unknownVar === "number") {
  num = unknownVar;
}
export {};

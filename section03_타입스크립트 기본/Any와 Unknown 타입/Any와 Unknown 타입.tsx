// any
let anyVar: any = 10;
let num: number = 10;

num = anyVar;


// unknown
let unknownVar: unknown;

unknownVar = "";
unknownVar = 1;
unknownVar = () => {};

if (typeof unknownVar === "number") {
  num = unknownVar;
}

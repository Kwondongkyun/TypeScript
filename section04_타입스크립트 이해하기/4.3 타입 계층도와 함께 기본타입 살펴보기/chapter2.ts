// unknown 타입
function unkwonExam() {
  let a: unknown = 1;
  let b: unknown = "hello";
  let c: unknown = true;
  let d: unknown = null;
  let e: unknown = undefined;
}

// Never 타입
function neverExam() {
  function neverFunc(): never {
    while (true) {}
  }

  let num: number = neverFunc();
  let str: string = neverFunc();
  let bool: boolean = neverFunc();
}

// void 타입
function voidExam() {
  function voidFunc(): void {
    console.log("hi");
    return undefined;
  }
  let voidVar: void = undefined;
  let numVar: null = null;
  voidVar = numVar; // strictNullChecks: false일 때만 가능
}

// Any 타입
function anyExam() {
  let unknownVar: unknown;
  let anyVar: any;
  let undefinedVar: undefined;
  let neverVar: never;

  anyVar = unknownVar;
  undefinedVar = anyVar;
}

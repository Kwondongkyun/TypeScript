/**
 * 타입스크립트의 클래스
 */

const employee = {
  name: "kwon",
  age: 25,
  position: "developer",
  work() {
    console.log("working");
  },
};

class Employee {
  // 필드
  name: string;
  age: number;
  position: string;

  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }

  work() {
    console.log("working");
  }
}

// 인스턴스 생성해보기
const employeeB = new Employee("kwon", 25, "개발자");
console.log(employeeB);

// 타입스크립트 클래스 타입으로 활용해보기
const employeeC: Employee = {
  name: "",
  age: 0,
  position: "",
  work() {},
};

// 세분화된 Employee 클래스
class ExecutiveOfficer extends Employee {
  // 필드
  officeNumber: number;

  // 생성자
  constructor(
    name: string,
    age: number,
    position: string,
    officeNumber: number
  ) {
    super(name, age, position);
    this.officeNumber = officeNumber;
  }
}

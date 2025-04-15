/**
 * 접근 제어자(access modifier)
 */

class Employee {
  constructor(
    private name: string,
    protected age: number,
    public position: string
  ) {}

  work() {
    console.log(`${this.name} working`);
  }
}

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
  func() {
    // this.name;
    this.age;
  }
}

const employee = new Employee("kwon", 25, "student");
// employee.name = "kim";
// employee.age = 30;
employee.position = "디자이너";

console.log(employee);

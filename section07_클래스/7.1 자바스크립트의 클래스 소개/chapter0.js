/**
 * 클래스
 */

let studentA = {
  name: "kwon",
  grade: "A+",
  age: 25,
  study() {
    console.log("공부하기");
  },
  introduce() {
    console.log("hello");
  },
};

class Student {
  // 필드
  name;
  grade;
  age;

  // 생성자
  constructor(name, grade, age) {
    this.name = name;
    this.grade = grade;
    this.age = age;
  }

  // 메서드
  study() {
    console.log("공부하기");
  }

  introduce() {
    console.log(`hello ${this.name}`);
  }
}

// 클래스를 이용해서 만든 객체 -> 인스턴스
// student 인스턴스
let studentB = new Student("kim", "B+", 25);
console.log(studentB);
studentB.study();
studentB.introduce();

// 클래스 상속
class StudentDeveloper extends Student {
  // 필드
  favoriteSkill;

  // 생성자
  constructor(name, grade, age, favoriteSkill) {
    super(name, grade, age);
    this.favoriteSkill = favoriteSkill;
  }

  // 메서드
  programming() {
    console.log(`${this.favoriteSkill}로 프로그래밍 함`);
  }
}

const studentDeveloper = new StudentDeveloper(
  "kwon",
  "A",
  25,
  "TypeScript"
);

console.log(studentDeveloper);
studentDeveloper.programming();

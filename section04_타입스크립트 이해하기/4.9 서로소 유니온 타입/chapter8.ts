/**
 * 서로소 유니온 타입
 * - 교집합이 없는 타입들로만 만든 유니온 타입을 말함
 */

// 회원의 타입을 별칭으로 정의
type Admin = {
  tag: "ADMIN";
  name: string;
  kickCount: number;
};

type Member = {
  tag: "MEMBER";
  name: string;
  point: number;
};

type Guest = {
  tag: "GUEST";
  name: string;
  visitCount: number;
};

// 3가지 타입 유니온 한 타입 생성
type User = Admin | Member | Guest;

// 유저의 유형별로 출력 메세지 변경
function login(user: User) {
  switch (user.tag) {
    case "ADMIN": {
      console.log(
        `${user.name}님 현재까지 ${user.kickCount}명 강퇴했습니다.`
      );
      break;
    }
    case "MEMBER": {
      console.log(
        `${user.name}님 현재까지 ${user.point}모았습니다.`
      );
      break;
    }
    case "GUEST": {
      console.log(
        `${user.name}님 현재까지 ${user.visitCount}번 방문하셨습니다.`
      );
      break;
    }
  }
}

/**
 * 복습 겸 추가 예시
 */

type LoadingTask = {
  state: "LOADING";
};

type FailedTask = {
  state: "FAILED";
  error: {
    message: string;
  };
};

type SuccessTask = {
  state: "SUCCESS";
  response: {
    data: string;
  };
};

// 서로소 유니온 타입 생성
type AsyncTask = LoadingTask | FailedTask | SuccessTask;

// 비동기 작업의 처리 결과를 매개변수로 받아 상태에 따라 처리
function processResult(task: AsyncTask) {
  switch (task.state) {
    case "LOADING": {
      console.log("로딩 중");
      break;
    }
    case "FAILED": {
      console.log(`에러 발생 : ${task.error.message}`);
      break;
    }
    case "SUCCESS": {
      console.log(`성공 : ${task.response.data}`);
      break;
    }
  }
}

const loading: AsyncTask = {
  state: "LOADING",
};

const failed: AsyncTask = {
  state: "FAILED",
  error: {
    message: "오류 발생 원인 : ~",
  },
};

const success: AsyncTask = {
  state: "SUCCESS",
  response: {
    data: "데이터 ~",
  },
};

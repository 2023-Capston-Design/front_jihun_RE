const BASE_URL = 'http://61.84.16.78:3000';

export const API = {
    BASE: `http://61.84.16.78:`, // 기본 주소
    MEMBER: `${BASE_URL}/v1/member`, // 조회,회원가입,수정,삭제
    EMAILAUTH: `${BASE_URL}/v1/auth/email`, // 이메일 인증 절차
    LOGIN: `${BASE_URL}/v1/auth/login`, // 로그인 
    EMAILCHK: `${BASE_URL}/v1/member/check/email`, // 이메일 중복확인
    GIDCHK: `${BASE_URL}/v1/member/check/gid`, // 그룹아이디 중복확인
    DEPARTMENT: `${BASE_URL}/v1/department`, // 부서 조회, 생성, 수정, 삭제
    DIDREAD: `${BASE_URL}/v1/department/id`, // 부서 아이디로 조회
    MEMREADBYID: `${BASE_URL}/v1/member/id`, // 아이디로 멤버 조회
    TKNREFRESH: `${BASE_URL}/v1/auth/refresh`, // 토큰 리프레쉬
    LOGOUT: `${BASE_URL}/v1/auth/logout`, // 로그아웃
    CLASSIMAGE: `${BASE_URL}/v1/class-image`, // 클래스 이미지 생성,조회,삭제
    CLASS: `${BASE_URL}/v1/class`, // 수업 생성,조회,수정,삭제
    CLASSINSTRUCTOR: `${BASE_URL}/v1/class/instructor`, // 교수 수업조회
    CLASSDEPARTMENT: `${BASE_URL}/v1/class/department`, // 학과 수업조회
    CLASSSTUDENT: `${BASE_URL}/v1/class/available`, // 학생의 등록 가능한 수업 조회
    CLASSENROLL: `${BASE_URL}/v1/class/enroll`, // 학생 수강신청
    CLASSOUT: `${BASE_URL}/v1/class/withdraw`, // 학생 수업 탈퇴
    CLASSROOM: `${BASE_URL}/v1/class/student`, // 학생 클래스룸 수업 조회
    CLASSBYID: `${BASE_URL}/v1/class/id`, // id로 수업 정보 조회

};
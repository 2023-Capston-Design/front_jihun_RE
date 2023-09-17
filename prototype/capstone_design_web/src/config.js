const BASE_URL = 'http://localhost:3000';

export const API = {
    REGISTER: `${BASE_URL}/v1/member`, // 조회,회원가입,수정,삭제
    EMAILAUTH: `${BASE_URL}/v1/auth/email`, // 이메일 인증 절차
    LOGIN: `${BASE_URL}/v1/auth/login`, // 로그인 
    EMAILCHK: `${BASE_URL}/v1/member/check/email`, // 이메일 중복확인
    GIDCHK: `${BASE_URL}/v1/member/check/gid`, // 그룹아이디 중복확인
    DEPARTMENT: `${BASE_URL}/v1/department`, // 부서 조회, 생성, 수정, 삭제
    DIDREAD: `${BASE_URL}/v1/department/id`, // 부서 아이디로 조회
    MEMREADBYID: `${BASE_URL}/v1/member/id`, // 아이디로 멤버 조회
    TKNREFRESH: `${BASE_URL}/v1/auth/refresh`, // 토큰 리프레쉬
    LOGOUT: `${BASE_URL}/v1/auth/logout`, // 로그아웃

};
const BASE_URL = 'http://localhost:3000';

export const API = {
    REGISTER: `${BASE_URL}/v1/member`,
    READ: `${BASE_URL}/v1/member`,
    EMAILAUTH: `${BASE_URL}/v1/auth/email`,
    LOGIN: `${BASE_URL}/v1/auth/login`,
    EMAILCHK: `${BASE_URL}/v1/member/check/email`,
    GIDCHK: `${BASE_URL}/v1/member/check/gid`,
    DIDREAD: `${BASE_URL}/v1/department/id`,
};
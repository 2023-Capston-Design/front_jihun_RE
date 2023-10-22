import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// @mui
import {  Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
// config
import {API} from '../../../config';
import { setCookie } from '../cookie/cookie';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClickSignin = () => {
    axios.post(`${API.LOGIN}`, {
      "email": email,
      "password": password
    }).then((response)=>{
      console.log(`엑세스 토큰: ${response.data.accessToken}`)
      console.log(`리프레쉬 토큰: ${response.data.refreshToken}`)
      setCookie("access_tk", response.data.accessToken);
      setCookie("refresh_tk", response.data.refreshToken);
      navigate('/dashboard', { replace: true });

    }).catch((error)=>{
      console.log(error.response.data.message)
      if (error.response.data.message === "MEMBER_NOT_FOUND") {
        alert("회원정보가 존재하지 않습니다.")
      } else if (error.response.data.message === "PASSWORD_UNMATCHED") {
        alert("비밀번호가 일치하지 않습니다.")
      } else if (error.response.data.message === "INVALID_MEMBER_APPROVAL") {
        alert("관리자의 허가를 필요로 합니다.")
      } else if (error.response.data.message === "EMAIL_YET_CONFIRMED") {
        alert("이메일 인증이 완료되지 않았습니다.")
      } else {
        alert("이메일과 비밀번호를 올바르게 입력해주세요.")
      };
    })
    // 여기에 로그인 관련 코드 입력
    // navigate('/dashboard', { replace: true });
  };

  const handleClickJoinin = () => {
    // 여기에 회원가입 관련 코드 입력
    navigate('/signUp');
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField 
        name="loginEmail" 
        label="이메일" 
        type='email'
        onChange={(e)=>setEmail(e.target.value)}
        />

        <TextField
          name="loginPassword"
          label="비밀번호"
          type={showPassword ? 'text' : 'password'}
          onChange={(e)=>setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}/>

      <LoadingButton sx={{ 
        backgroundColor: 'rgba(255, 86, 48, 0.7)',
        boxShadow: '0 8px 16px 0 rgba(255, 86, 48, 0.14)',
        '&:hover': {
          backgroundColor: 'rgba(255, 86, 48)', // hover 시 배경 색상 변경
        }
       }} fullWidth size="large" type="submit" variant="contained" onClick={handleClickSignin} >
        로그인
      </LoadingButton>

      <LoadingButton sx={{ 
        mt: 2,
        color:  'rgba(255, 86, 48, 0.7)',
        borderColor: 'rgba(255, 86, 48, 0.7)',
        '&:hover': {
          borderColor: 'rgba(255, 86, 48)', // hover 시 배경 색상 변경
          backgroundColor: 'rgba(255, 86, 48, 0.05)'
        }
      }} fullWidth size="large" type="submit" variant="outlined" onClick={handleClickJoinin} >
        회원가입
      </LoadingButton>
    </>
  );
}

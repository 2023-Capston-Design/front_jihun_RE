import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// @mui
import { Stack} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import InputName from './InputName';
import InputBirth from './InputBirth';
import InputSex from './InputSex';
import InputMemberRole from './InputMemberRole';
import InputEmail from './InputEmail';
import InputGroupId from './InputGroupId';
import InputPassword from './InputPassword';
// config
import {API} from '../../../config';

// ----------------------------------------------------------------------

export default function SignUpForm() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [groupId, setGroupId] = useState('');
  const [sex, setSex] = useState('');
  const [birth, setBirth] = useState('');
  const [memberRole, setMemberRole] = useState('');

  const handleName = (newName) => {
    setName(newName);
  }
  const handlePassword = (newPassword) => {
    setPassword(newPassword);
  }
  const handleEmail = (newEmail) => {
    setEmail(newEmail);
  }
  const handleGroupId = (newGid) => {
    setGroupId(newGid);
  }
  const handleSex = (newSex) => {
    setSex(newSex);
  }
  const handleDate = (newDate) => {
    setBirth(newDate);
  }
  const handleMemberRole = (newMemberRole) => {
    setMemberRole(newMemberRole);
  }


  const handleSignup = () => {  // 회원가입 로직 실행
    let id='';
    axios.post(`${API.REGISTER}`, {
      "name": `${name}`,
      "password": `${password}`,
      "email": `${email}`,
      "groupId": `${groupId}`,
      "sex": `${sex}`,
      "birth": `${birth}`,
      "memberRole": `${memberRole}`
    }).then((response) => {
      console.log(response.data.id);
      id = response.data.id;
      emailAuth(id);
    }).catch((error) => {
      console.log(error);
    });
    // 여기에 회원가입 완료 관련 코드 입력
    // navigate('/dashboard/user', { replace: true });
  };

  const emailAuth = (id) => {
    let emailMsg = '';
    console.log(`이메일 인증: ${id}`);
    console.log(typeof id);
    axios.post(`${API.EMAILAUTH}`, {
      "id": id
    }).then((response) => {
      console.log(`이메일 인증키: ${response.data.msg}`);
      emailMsg = response.data.msg;
      emailChk(emailMsg)
    }).catch((error) => {
      console.log(error);
    });
  }

  const emailChk = (emailMsg) => {
    axios.get(`${API.EMAILAUTH}`, {
      params: {
        key: emailMsg
      }
    }).then((response) => {
      console.log(`이메일 인증: ${response.data.msg}`)
      navigate('/login', {replace: true});
    }).catch((error)=>{
      console.log(error)
    });
  }

  return (
    < >
      <Stack spacing={2}>
        <InputName
          onNameChange={handleName}
        />
        <InputPassword
          onPasswordChange={handlePassword}
        />
        <InputEmail
          onEmailChange={handleEmail}
        />
        <InputGroupId
          onGroupIdChange={handleGroupId}
        />
        <InputSex
          onSexChange={handleSex}
        />
        <InputBirth
          onDateChange={handleDate}
        />
        <InputMemberRole
          onMemberRoleChange={handleMemberRole}
        />
        <LoadingButton sx={{
          backgroundColor: 'rgba(255, 86, 48, 0.7)',
          boxShadow: '0 8px 16px 0 rgba(255, 86, 48, 0.14)',
          '&:hover': {
            backgroundColor: 'rgba(255, 86, 48)', // hover 시 배경 색상 변경
          }
        }} fullWidth size="large" type="submit" variant="contained" onClick={handleSignup} >
          가입하기
        </LoadingButton>
      </Stack>

      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
         <Typography variant="body2" sx={{ ml:"-175px" }}>
          로그인 정보 기억하기.
          </Typography> 
          
         <Link variant="subtitle2" underline="hover" href='/forgotLogin'> 
          아이디/비밀번호 찾기
        </Link>
      </Stack> */}


    </>
  );
}

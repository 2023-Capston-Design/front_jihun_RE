import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// @mui
import { Stack} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import InputName from './Component/InputName';
import InputBirth from './Component/InputBirth';
import InputSex from './Component/InputSex';
import InputMemberRole from './Component/InputMemberRole';
import InputEmail from './Component/InputEmail';
import InputGroupId from './Component/InputGroupId';
import InputPassword from './Component/InputPassword';
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
  const [departmentId, setDepartmentId] = useState('');

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
  const handleMemberRole = (newMemberRole, newDepartmentId) => {
    setMemberRole(newMemberRole);
    setDepartmentId(newDepartmentId);
  }


  const handleSignup = () => {  // 회원가입 로직 실행
    let id='';
    /* const formData = new FormData(); // FromData 로직으로 텍스트+파일 전송을 한번에 처리

    formData.append('name', name);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('groupId', groupId);
    formData.append('sex', sex);
    formData.append('birth', birth);
    formData.append('memberRole', memberRole);
    formData.append('departmentId', departmentId);
    formData.append('profile', profile); */

    axios.post(`${API.MEMBER}`, {
      "name": name,
      "password": password,
      "email": email,
      "groupId": groupId,
      "sex": sex,
      "birth": birth,
      "memberRole": memberRole,
      "departmentId": departmentId
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

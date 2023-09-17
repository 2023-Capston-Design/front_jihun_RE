import { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode'
// @mui
import { Stack, TextField, IconButton, InputAdornment, } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// component
import Iconify from '../../../components/iconify';
// config
import { API } from '../../../config';
// cookie
import { getCookie } from '../../auth/cookie/cookie';
import { Password } from '@mui/icons-material';

// ----------------------------------------------------------------------

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

// ----------------------------------------------------------------------

export default function MyinfoModify() {

    const [tkn, setTkn] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [originalPw, setOriginalPw] = useState('');
    const [changedPw, setChangedPw] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [birth, setBirth] = useState('');
    const [profile, setProfile] = useState('');

    useEffect(() => {
        const tkn = getCookie("access_tk");
        setTkn(tkn);
        console.log(tkn)
        const decodedTkn = jwtDecode(tkn);
        console.log(`디코드한 토큰 값: ${decodedTkn.user_id}`);
        setId(decodedTkn.user_id);

        axios.get(`${API.MEMREADBYID}/1`, {
            headers: {
                'Authorization': `Bearer ${tkn}`
            }
        }).then((response) => {
            console.log(response.data)
            setName(response.data.name);
            setEmail(response.data.email);
            setProfile(response.data.profile);
        }).catch((error) => {
            console.log(error.response.data.message)
            if (error.response.data.message === "Unauthorized") { // 토큰 만료시 실행
                const reTkn = getCookie("refresh_tk");
                axios.post(`${API.TKNREFRESH}`, {
                    headers: {
                        'Authorization': `Bearer ${reTkn}`
                    }
                }).then((response) => {
                    console.log(response)
                }).catch((error) => {
                    console.log(error)
                });
            }
        });
    }, []);

    const handleDate = (date) => { // birth ('YYYY-MM-DD') 형태로 지정 후 setBirth
        date = new Date(date);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setBirth(formattedDate);
    };

    const handleFileSelect = (e) => {
        const fileSelected = e.target.files[0];
        console.log(`filename: ${fileSelected}`)
        if (fileSelected) {
            setProfile(fileSelected);
        }
    }

    const handleModify = () => {  // 회원가입 로직 실행


        const formData = new FormData(); // FromData 로직으로 텍스트+파일 전송을 한번에 처리
        formData.append('name', name);
        formData.append('changedpassword', changedPw);
        formData.append('originalpassword', originalPw);
        formData.append('birth', birth);
        formData.append('profile', profile);
        console.log(formData);

        axios.patch(`${API.REGISTER}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${tkn}`
            }
        }).then((response) => {
            console.log(response.data.id);

        }).catch((error) => {
            console.log(error.response.data.message);
        });
        // 여기에 회원가입 완료 관련 코드 입력
        // navigate('/dashboard/user', { replace: true });
    };

    return (
        < >
            <Stack spacing={2}>
                <TextField
                    required
                    name="name"
                    label="이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <TextField
                    name="email"
                    label="이메일"
                    value={email}
                />

                <TextField
                    required
                    name="originalPw"
                    label="현재 비밀번호"
                    type={showPassword1 ? 'text' : 'password'}
                    onChange={(e) => setOriginalPw(e.target.value)}

                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword1(!showPassword1)} edge="end">
                                    <Iconify icon={showPassword1 ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    required
                    name="changedPw"
                    label="변경할 비밀번호"
                    type={showPassword2 ? 'text' : 'password'}
                    onChange={(e) => setChangedPw(e.target.value)}

                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword2(!showPassword2)} edge="end">
                                    <Iconify icon={showPassword2 ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="생년월일"
                        value={birth}
                        disableFuture
                        views={['year', 'month', 'day']}
                        onChange={handleDate}
                    />
                </LocalizationProvider>

                <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    href="#file-upload"
                >
                    Upload a file
                    <VisuallyHiddenInput type="file" onChange={handleFileSelect} />
                </Button>

                <LoadingButton sx={{
                    backgroundColor: 'rgba(255, 86, 48, 0.7)',
                    boxShadow: '0 8px 16px 0 rgba(255, 86, 48, 0.14)',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 86, 48)', // hover 시 배경 색상 변경
                    }
                }} fullWidth size="large" type="submit" variant="contained" onClick={handleModify} >
                    수정하기
                </LoadingButton>
            </Stack>
        </>
    );
}

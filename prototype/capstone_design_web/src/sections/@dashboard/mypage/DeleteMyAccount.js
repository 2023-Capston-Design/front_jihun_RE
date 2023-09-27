import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Stack, TextField, IconButton, InputAdornment, } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { LoadingButton } from '@mui/lab';

import Iconify from '../../../components/iconify';
import { API } from "../../../config";
import { getCookie, rmCookie } from "../../auth/cookie/cookie";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default function DeleteMyAccount() {
  const navigate = useNavigate();

  const [tkn, setTkn] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(()=>{
    const ac = getCookie("access_tk");
    setTkn(ac);
  },[]);

  /** 회원탈퇴를 진행하는 요소 */
  const handleDelete = () => {
    axios.delete(`${API.MEMBER}`, {
      headers: {
        "Authorization": `Bearer ${tkn}`
      },
      data: {
        "password": password
      }
    }).then((response) => {
      console.log(response)
      setOpen(false);
      rmCookie("access_tk");
      rmCookie("refresh_tk");
      const ac1 = getCookie("access_tk");
      const rc1 = getCookie("refresh_tk");
      console.log(`삭제후: ${ac1} & ${rc1}`)

      alert("탈퇴가 완료되었습니다.");
      navigate('/login', { replace: true });
    }).catch((error) => {
      console.log(error)
    })
  }
  return (
    <div>
      <LoadingButton sx={{
        backgroundColor: 'rgba(255, 86, 48, 0.7)',
        boxShadow: '0 8px 16px 0 rgba(255, 86, 48, 0.14)',
        '&:hover': {
          backgroundColor: 'rgba(255, 86, 48)', // hover 시 배경 색상 변경
        }
      }} fullWidth size="large" type="submit" variant="contained" onClick={handleOpen} >
        탈퇴하기
      </LoadingButton>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              회원 탈퇴
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              회원 탈퇴를 계속 진행하시려면 비밀번호를 입력해주세요.
            </Typography>
            <TextField
              required
              name="password"
              label="비밀번호"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}

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
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <LoadingButton sx={{
                backgroundColor: 'rgba(255, 86, 48, 0.7)',
                boxShadow: '0 8px 16px 0 rgba(255, 86, 48, 0.14)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 86, 48)', // hover 시 배경 색상 변경
                }
              }} fullWidth size="large" type="submit" variant="contained" onClick={handleDelete} >
                탈퇴하기
              </LoadingButton>
              <LoadingButton sx={{
                backgroundColor: 'rgba(255, 86, 48, 0.7)',
                boxShadow: '0 8px 16px 0 rgba(255, 86, 48, 0.14)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 86, 48)', // hover 시 배경 색상 변경
                }
              }} fullWidth size="large" type="submit" variant="contained" onClick={handleClose} >
                최소
              </LoadingButton>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

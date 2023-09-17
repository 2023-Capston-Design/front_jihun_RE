import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import { rmCookie, getCookie } from '../../../sections/auth/cookie/cookie';
// mocks_
import account from '../../../_mock/account';

import { API } from '../../../config';


// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Mypage',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  /** 현재 로그인 되어있는 회원정보 조회 */
  

  /** 마이페이지로 연결 */
  const handleMypage = () => {
    navigate('/dashboard/mypage', {replace: true});  
    setOpen(null);
  }

  /** 로그아웃을 진행하는 함수  */
  const handleLogout = async () => {
    const ac = getCookie("access_tk");
    const rc = getCookie("refresh_tk");
    console.log(`삭제전: ${ac} & ${rc}`)
    await axios.delete(`${API.LOGOUT}`, {
      headers: {
        'Authorization': `Bearer ${ac}`
      }
    }).then((response)=> {
      console.log(response)
    }).catch((error)=> {
      console.log(error)
    });

    rmCookie("access_tk");
    rmCookie("refresh_tk");
    const ac1 = getCookie("access_tk");
    const rc1 = getCookie("refresh_tk");
    console.log(`삭제후: ${ac1} & ${rc1}`)

    navigate('/login', {replace: true});  
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleMypage}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}

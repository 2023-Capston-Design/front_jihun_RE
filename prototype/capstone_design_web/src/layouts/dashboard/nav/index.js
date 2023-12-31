import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Avatar } from '@mui/material';// Button, Stack 사용 안해서 지워둠
// mock
import account from '../../../_mock/account';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//
import navConfig from './config';
import { getCookie } from '../../../sections/auth/cookie/cookie';
import { API } from '../../../config';
// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  const [manager, setManager] = useState(false);
  const [student, setStudent] = useState(false);
  const [instructor, setInstructor] = useState(false);

  useEffect(() => {
    const tk = getCookie("access_tk");
    const decodedTkn = jwtDecode(tk);

    axios.get(`${API.MEMREADBYID}/${decodedTkn.user_id}`, {
      headers: {
        "Authorization": `Bearer ${tk}`
      }
    }).then((response) => {
      const memberRole = response.data.memberRole;
      if (memberRole === "manager") {
        setManager(true);
        setInstructor(false);
        setStudent(false);
      }
      else if (memberRole === "instructor" || memberRole === "manager") {
        setManager(false);
        setInstructor(true);
        setStudent(false);
      } else {
        setManager(false);
        setInstructor(false);
        setStudent(true);
      };
    }).catch((error) => {
      console.log(error)
    });
  }, []);

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      {/* <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}> { 사용자 프로필 사진 파트 }
        <Link underline="none">
          <StyledAccount>
            <Avatar src={account.photoURL} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {account.displayName}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {account.role}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box> */}

      <Typography variant="subtitle2" sx={{ ml: 1 }}>사용자 관리</Typography>
      {manager && (
        <>
        <NavSection data={navConfig[0]} />
        </>
      )}
      {instructor && (
        <>
        <NavSection data={navConfig[1]} />
        </>
      )}
      {student && (
        <>
        <NavSection data={navConfig[2]} />
        </>
      )}
      {/*       <Typography variant="subtitle2" sx={{ ml: 1 }}>개인정보처리방침</Typography>
      <NavSection data={navConfig[1]} /> */}
      <Box sx={{ flexGrow: 1 }} />
      {/* <Box sx={{ px: 2.5, pb: 3, mt: 10 }}> 네비게이션 바 광고
        <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
          <Box
            component="img"
            src="/assets/illustrations/illustration_avatar.png"
            sx={{ width: 100, position: 'absolute', top: -50 }}
          />

          <Box sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h6">
              Get more?
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              From only $69
            </Typography>
          </Box>

          <Button href="https://material-ui.com/store/items/minimal-dashboard/" target="_blank" variant="contained">
            Upgrade to Pro
          </Button>
        </Stack>
      </Box> */}
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

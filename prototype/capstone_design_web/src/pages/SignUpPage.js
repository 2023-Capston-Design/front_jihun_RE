import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';// Divider, Stack, Button 안써서 제외
// sections
import { SignUpForm } from '../sections/auth/signUp';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() { 

  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              회원가입
            </Typography>

            {/* <Typography variant="subtitle2" gutterBottom>
            정보를 입력해주세요!
            </Typography>

            <Typography sx={{ mb: 5 }} variant="body2" >
              계정이 없으시다면?
              <Link variant="subtitle2" href='/signUp'>가입하기</Link>
            </Typography> */}

            <SignUpForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

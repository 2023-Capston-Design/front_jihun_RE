import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import { Container, Typography, } from '@mui/material';

import { MyinfoModify } from '../sections/@dashboard/mypage';
// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',

}));

// ----------------------------------------------------------------------
export default function MyPage() {
  
  return (
    < >
      <Helmet>
        <title>MyPage</title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          마이페이지
        </Typography>

        <StyledContent>
          <MyinfoModify />
        </StyledContent>
      </Container>

    </>
  );
}

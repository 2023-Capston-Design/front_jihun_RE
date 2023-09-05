import { Helmet } from 'react-helmet-async';
// import { faker } from '@faker-js/faker'; 해당 라이브러리는
// @mui
// import { useTheme } from '@mui/material/styles';
import { Container, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// components
// import Iconify from '../components/iconify';
// sections
// import {
//   AppTasks,
//   AppNewsUpdate,
//   AppOrderTimeline,
//   AppCurrentVisits,
//   AppWebsiteVisits,
//   AppTrafficBySite,
//   AppWidgetSummary,
//   AppCurrentSubject,
//   AppConversionRates,
// } from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  // const theme = useTheme();
  const modal = () => {
    // 여기에 회원가입 완료 관련 코드 입력
    console.log("버튼 클릭");
  };
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back

          <Button sx={{float:"right"}} variant="outlined" startIcon={<AddIcon />} onClick={modal} >
            Add Profile
          </Button>
        </Typography>


        <div>첫번째 모달 팝업</div>
        <div>두번째 모달 팝업</div>
        
        
      </Container>
    </>
  );
}

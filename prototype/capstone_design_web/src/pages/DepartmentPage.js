import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography, Stack } from '@mui/material';
// components
import { DepartmentList, } from '../sections/@dashboard/department';
import CreateDepartment from '../sections/@dashboard/department/CreateDepartment';

// ----------------------------------------------------------------------

export default function ProductsPage() {

  const refreshPage= () => {
    window.location.reload();
  }

  return (
    <>
      <Helmet>
        <title> 부서관리 페이지 </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            부서관리
          </Typography>
          <CreateDepartment onCreateDepartment={refreshPage} />
        </Stack>

        <DepartmentList />
        {/* <ProductCartWidget /> */}
      </Container>
    </>
  );
}

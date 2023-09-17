import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { API } from '../../../config'
import { getCookie } from '../../auth/cookie/cookie';
import ModifyDepartment from './ModifyDepartment';


// ----------------------------------------------------------------------

const StyledDepartmentImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

DepartmentCard.propTypes = {
  department: PropTypes.object,
  onDeleteDepartment: PropTypes.func.isRequired,
};

export default function DepartmentCard({ department, onDeleteDepartment }) {
  const { id, name, phoneNumber, url, departmentProfileURL } = department;
  const [tkn, setTkn] = useState('');
  

  useEffect(() => {
    const tkn = getCookie("access_tk");
    setTkn(tkn);
    console.log(tkn)
  }, [])

  /** 학부 수정 */
  const modifyDepartment = () => {
    console.log(`수정 => ${id}`)
  };

  const onClose = () => {
    onDeleteDepartment(id);
  };

  /** 학부 삭제 */
  const deleteDepartment = () => {
    axios.delete(`${API.DEPARTMENT}`, {
      data: {
        "id": id
      },
      headers: {
        'Authorization': `Bearer ${tkn}`
      }
    }).then((response) => {
      console.log(response)
      onDeleteDepartment(id);
    }).catch((error) => {
      console.log(error)
    })
  };

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <StyledDepartmentImg alt={name} src={departmentProfileURL} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            {phoneNumber}
          </Typography>
          <Typography variant="subtitle1">
            {url}
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.1}>
        <ModifyDepartment id={Number(id)} onClose={onClose}/>
        <LoadingButton sx={{
          backgroundColor: 'rgba(255, 86, 48, 0.7)',
          boxShadow: '0 8px 16px 0 rgba(255, 86, 48, 0.14)',
          '&:hover': {
            backgroundColor: 'rgba(255, 86, 48)', // hover 시 배경 색상 변경
          }
        }} fullWidth size="large" type="submit" variant="contained" onClick={deleteDepartment} >
          삭제
        </LoadingButton>
      </Stack>

    </Card>
  );
}

import { useState, useEffect } from 'react';
// @mui
import { Grid } from '@mui/material';
import axios from 'axios';
import DepartmentCard from './DepartmentCard';
// axios&config

import { API } from '../../../config';

// ----------------------------------------------------------------------

export default function DepartmentList({ ...other }) {

  const [departmentArray, setDepartmentArray] = useState([]);

  /** 부서 삭제/ 수정시 리 렌더링을 위함 */
  const refreshPage = ()=> {
    window.location.reload();
  }

  useEffect(() => {
    axios.get(`${API.DEPARTMENT}`, {
      params: {
        "page": 1,
        "pagesize": 100,
      }
    })
      .then((response) => {
        console.log(response);
        setDepartmentArray(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Grid container spacing={3} {...other}>
      {departmentArray.map((department) => (
        <Grid key={department.id} item xs={12} sm={6} md={3}>
          <DepartmentCard department={department} onDeleteDepartment={refreshPage} />
        </Grid>
      ))}
    </Grid>
  );
}

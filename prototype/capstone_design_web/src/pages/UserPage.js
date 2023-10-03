import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Container, TextField, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { LoadingButton } from '@mui/lab';

import { API } from '../config';
import { getCookie } from '../sections/auth/cookie/cookie';
import Scrollbar from '../components/scrollbar';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [approve, setApprove] = useState('');
  const [reason, setReason] = useState('');
  const [tk, setTk] = useState('');

  useEffect(() => {
    const tempTk = getCookie("access_tk");
    setTk(tempTk);
  }, []);

  const handleChange = () => {
    axios.patch(`${API.MEMBER}/approval`, {
      "id": row.id,
      "approved": approve,
      "approvedReason": reason
    }, {
      headers: {
        "Authorization": `Bearer ${tk}`
      }
    }).then((response) => {
      console.log(response.data.msg)
      if (response.data.msg === true) {
        window.location.reload();
      }
    }).catch((error) => {
      console.log(error)
    })
  }


  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell >{row.email}</TableCell>
        <TableCell >{row.groupId}</TableCell>
        <TableCell >{row.memberRole}</TableCell>
        <TableCell >{row.approved}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Stack spacing={1}>
                <Typography variant="h6" gutterBottom component="div">
                  상태 변경 사유
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        ApprovedReason:
                        <Typography align="right">
                          {row.approvedReason}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
                <Typography variant="h6" gutterBottom component="div">
                  상태 변경
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="select_approve">인증 상태</InputLabel>
                  <Select
                    labelId="select_approve"
                    id="approve"
                    value={approve}
                    label="인증 상태"
                    onChange={(e) => setApprove(e.target.value)}
                  >
                    <MenuItem value={'pending'}>대기중-pending</MenuItem>
                    <MenuItem value={'approve'}>인증-approve</MenuItem>
                    <MenuItem value={'reject'}>인증 거절-reject</MenuItem>
                    <MenuItem value={'restrict'}>정지-restrict</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  name="approvedReason"
                  label="사유 작성"
                  type='text'
                  onChange={(e) => setReason(e.target.value)}
                />
                <LoadingButton sx={{
                  backgroundColor: 'rgba(255, 86, 48, 0.7)',
                  boxShadow: '0 8px 16px 0 rgba(255, 86, 48, 0.14)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 86, 48)', // hover 시 배경 색상 변경
                  }
                }} fullWidth size="large" type="submit" variant="contained" onClick={handleChange} >
                  변경하기
                </LoadingButton>
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}


Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    groupId: PropTypes.string.isRequired,
    memberRole: PropTypes.string.isRequired,
    approved: PropTypes.string.isRequired,
    approvedReason: PropTypes.string.isRequired,
  }).isRequired,
};

export default function CollapsibleTable() {

  const [userArray, setUserArray] = useState([]);

  useEffect(() => {

    axios.get(`${API.MEMBER}`, {
      params: {
        "page": 1,
        "pagesize": 100,
      }
    })
      .then((response) => {
        console.log(response);
        setUserArray(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>유저 관리 페이지</title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant='h4' sx={{ mb: 1 }}>
            유저 관리
          </Typography>
        </Stack>
        <Scrollbar>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>이름</TableCell>
                  <TableCell >이메일</TableCell>
                  <TableCell >학번(교번)</TableCell>
                  <TableCell >직책</TableCell>
                  <TableCell >인증 상태</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userArray.map((row) => (
                  <Row key={row.id} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Container>
    </>
  );
}

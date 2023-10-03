import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Container, TextField, Stack } from '@mui/material';
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
import CreateClassImage from '../sections/@dashboard/classImage/CreateClassImage'

function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const [tk, setTk] = useState('');

    useEffect(() => {
        const tempTk = getCookie("access_tk");
        setTk(tempTk);
    }, []);

    const handleDelete = () => {
        console.log(typeof (row.id))
        axios.delete(`${API.CLASSIMAGE}`, {
            data: {
                "id": row.id,
            },
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
                <TableCell >{row.status}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Stack spacing={1}>
                                <LoadingButton sx={{
                                    backgroundColor: 'rgba(255, 86, 48, 0.7)',
                                    boxShadow: '0 8px 16px 0 rgba(255, 86, 48, 0.14)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 86, 48)', // hover 시 배경 색상 변경
                                    }
                                }} fullWidth size="large" type="submit" variant="contained" onClick={handleDelete} >
                                    삭제하기
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
        status: PropTypes.string.isRequired,
    }).isRequired,
};

export default function ClassImagePage() {

    const [userArray, setUserArray] = useState([]);

    useEffect(() => {

        axios.get(`${API.CLASSIMAGE}`, {
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

    const refreshPage= () => {
        window.location.reload();
      }

    return (
        <>
            <Helmet>
                <title>클래스 이미지 관리</title>
            </Helmet>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant='h4' sx={{ mb: 5 }}>
                        클래스 이미지 관리
                    </Typography>
                    <CreateClassImage onCreateClassImage={refreshPage}/>

                </Stack>
                <Scrollbar>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>이미지 명</TableCell>
                                    <TableCell >상태</TableCell>
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

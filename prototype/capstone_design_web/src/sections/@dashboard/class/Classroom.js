import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { LoadingButton } from '@mui/lab';

import { API } from '../../../config';
import { getCookie } from '../../auth/cookie/cookie';
import Scrollbar from '../../../components/scrollbar';

function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const [tk, setTk] = useState('');
    const [id, setId] = useState('');
    const [instructor, setInstructor] = useState('');

    useEffect(() => {


        const tempTk = getCookie("access_tk");
        setTk(tempTk);
        const decodedTkn = jwtDecode(tempTk);
        setId(decodedTkn.user_id);

        axios.get(`${API.CLASSBYID}/${row.classes.id}`, {
            headers: {
                "Authorization": `Bearer ${tempTk}`
            }
        }).then((response) => {
            axios.get(`${API.MEMREADBYID}/${response.data.instructor.id}`, {
                headers: {
                    "Authorization": `Bearer ${tempTk}`
                }
            }).then((response) => {
                setInstructor(response.data.name)
            }).catch((error) => {
                console.log(error)
            });
        }).catch((error) => {
            console.log(error)
        });
    }, [row.classes.id]);

    const handleDrop = () => {
        console.log(typeof (row.classes.id))
        axios.delete(`${API.CLASSOUT}`, {
            data: {
                "classId": row.classes.id,
                "studentId": id
            },
            headers: {
                "Authorization": `Bearer ${tk}`
            }
        }).then((response) => {
            window.location.reload();
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
                    {row.classes.name}
                </TableCell>
                <TableCell >{row.classes.maximum_student}</TableCell>
                <TableCell >{instructor}</TableCell>
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
                                }} fullWidth size="large" type="submit" variant="contained" onClick={handleDrop} >
                                    수강 취소하기
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
        classes: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            maximum_student: PropTypes.number.isRequired,
        }),
    }).isRequired,
};

export default function ClassMain() {

    const [userArray, setUserArray] = useState([]);

    useEffect(() => {

        const tkn = getCookie("access_tk");

        axios.get(`${API.CLASSROOM}`, {
            params: {
                "page": 1,
                "pagesize": 100
            },
            headers: {
                "Authorization": `Bearer ${tkn}`
            }
        })
            .then((response) => {
                setUserArray(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Scrollbar>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>강의 명</TableCell>
                            <TableCell >최대 인원</TableCell>
                            <TableCell >담당 교수</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userArray.map((row) => (
                            row.classes ? (
                                <Row key={row.id} row={row} />
                            ) : null
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Scrollbar>
    );
}

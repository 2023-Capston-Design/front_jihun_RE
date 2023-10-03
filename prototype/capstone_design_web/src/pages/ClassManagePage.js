import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

import { Container, Typography, Stack } from '@mui/material';

import { getCookie } from '../sections/auth/cookie/cookie';
import { API } from '../config';
import { ClassMain, CreateClass, ClassEnroll } from '../sections/@dashboard/class';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
export default function ClassManagePage() {

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
            if (memberRole === "instructor" || memberRole === "manager") {
                setInstructor(true);
                setStudent(false)
            } else {
                setInstructor(false);
                setStudent(true);
            };
        }).catch((error) => {
            console.log(error)
        });
    }, []);

    const refreshPage = () => {
        window.location.reload();
    }


    return (
        < >
            <Helmet>
                {instructor && (
                    <>
                        <title>수업관리 페이지</title>
                    </>
                )}
                {student && (
                    <>
                        <title>수강신청 페이지</title>
                    </>
                )
                }
            </Helmet>

            <Container>
                {instructor && (
                    <>
                        <Container>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                <Typography variant="h4" sx={{ mb: 5 }}>
                                    수업 관리
                                </Typography>
                                <CreateClass onCreateClass={refreshPage} />
                            </Stack>
                            <ClassMain />
                        </Container>
                    </>
                )}
                {student && (
                    <>
                        <Container>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                <Typography variant="h4" sx={{ mb: 5 }}>
                                    수강신청
                                </Typography>
                            </Stack>
                            <ClassEnroll />
                        </Container>
                    </>
                )}
            </Container>

        </>
    );
}

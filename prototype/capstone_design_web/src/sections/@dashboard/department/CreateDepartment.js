import React, { useState } from 'react';
import axios from 'axios';
import { PropTypes } from 'prop-types';

import { TextField, Box, Button, Typography, Modal, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
/* import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles'; */

import { API } from '../../../config';
import Iconify from '../../../components/iconify';
import { getCookie } from '../../auth/cookie/cookie';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
};

/* const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`; */

export default function CreateDepartment({onCreateDepartment}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [url, setUrl] = useState('');
/*     const [profile, setProfile] = useState('');      // 파일 업로드 관련 코드

    const handleFileSelect = (e) => {
        const fileSelected = e.target.files[0];
        console.log(`filename: ${fileSelected}`)
        if (fileSelected) {
            setProfile(fileSelected);
        }
    } */

    const handelCreate = () => {
        const tkn = getCookie("access_tk");
        
        /* const formData = new FormData();
        formData.append("name", name);
        formData.append("phoneNumber", phoneNumber);
        formData.append("url", url);
        formData.append("profile", profile); */

        axios.post(`${API.DEPARTMENT}`, {
            "name": name,
            "phoneNumber": phoneNumber,
            "url": url
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${tkn}`
            }
        }).then((response) => {
            console.log(response.data.id);
            onCreateDepartment();
        }).catch((error) => {
            console.log(error.response.data.message);
        });
    };

    return (
        <>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>
                학과(부서) 생성
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Stack spacing={2}>
                        <Typography id="title" variant="h6" component="h2">
                            학과(부서) 생성
                        </Typography>

                        <TextField
                            required
                            name="name"
                            label="학과 이름"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            required
                            name="name"
                            label="학과 번호"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <TextField
                            required
                            name="name"
                            label="학과 홈페이지 주소"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        {/* <Button
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                            href="#file-upload"
                        >
                            부서 프로필 이미지 업로드
                            <VisuallyHiddenInput type="file" onChange={handleFileSelect} />
                        </Button> */}

                        <LoadingButton sx={{
                            backgroundColor: 'rgba(255, 86, 48, 0.7)',
                            boxShadow: '0 8px 16px 0 rgba(255, 86, 48, 0.14)',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 86, 48)', // hover 시 배경 색상 변경
                            }
                        }} fullWidth size="large" type="submit" variant="contained" onClick={handelCreate} >
                            생성하기
                        </LoadingButton>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
}

CreateDepartment.propTypes = {
    onCreateDepartment: PropTypes.func.isRequired,
};
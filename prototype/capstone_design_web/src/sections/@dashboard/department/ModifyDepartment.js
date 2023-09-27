import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { TextField, Box, /* Button, */ Typography, Modal, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
/* import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles'; */

import { API } from '../../../config';
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
/* 
const VisuallyHiddenInput = styled('input')`
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

export default function ModifyDepartment({id, onClose}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [url, setUrl] = useState('');
 /*    const [profile, setProfile] = useState('');

    const handleFileSelect = (e) => {
        const fileSelected = e.target.files[0];
        console.log(`filename: ${fileSelected}`)
        if (fileSelected) {
            setProfile(fileSelected);
        }
    } */

    /* const refresh = () => {
        const reTkn = getCookie("refresh_tk");
        axios.post(`${API.TKNREFRESH}`,{
            headers: {
                "Authorization":`Bearer ${reTkn}`
            }
        }).then((response) => {
            setCookie("access_tk", response.data.accessToken);
            handleModify();
        }).catch((error)=>{
            console.log(error)
        });
    } */

    const handleModify = () => {
        const tkn = getCookie("access_tk");

        /* const formData = new FormData();     //formData 제작
        formData.append("id", id)
        formData.append("name", name);
        formData.append("phoneNumber", phoneNumber);
        formData.append("url", url);
        formData.append("profile", profile); */

        axios.patch(`${API.DEPARTMENT}`, {
            "id": id,
            "name": name,
            "phoneNumber" : phoneNumber,
            "url": url
        }, {
            headers: {
                'Authorization': `Bearer ${tkn}`
            }
        }).then((response) => {
            console.log(response.data.id);
            handleClose();
        }).catch((error) => {
            console.log(error);
            if (error.response.data.message === 'Unathorized'){
                /* refresh(); */
                alert("토큰 갱신 필요");
            };
        });

        /* axios.patch(`${API.DEPARTMENT}`, formData, {     // formData 통신
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${tkn}`
            }
        }).then((response) => {
            console.log(response.data.id);

        }).catch((error) => {
            console.log(error);
        }); */
    };

    return (
        <>
            <LoadingButton sx={{
                backgroundColor: 'rgba(255, 86, 48, 0.7)',
                boxShadow: '0 8px 16px 0 rgba(255, 86, 48, 0.14)',
                '&:hover': {
                    backgroundColor: 'rgba(255, 86, 48)', // hover 시 배경 색상 변경
                }
            }} fullWidth size="large" type="submit" variant="contained" onClick={handleOpen} >
                수정
            </LoadingButton>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Stack spacing={2}>
                        <Typography id="title" variant="h6" component="h2">
                            학과(부서) 정보 수정
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
                       {/*  <Button
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
                        }} fullWidth size="large" type="submit" variant="contained" onClick={handleModify} >
                            수정하기
                        </LoadingButton>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
}

ModifyDepartment.propTypes = {
    onClose : PropTypes.func.isRequired,
    id: PropTypes.number.isRequired, // id prop의 타입을 number로 지정하고 필수 필드로 설정
  };
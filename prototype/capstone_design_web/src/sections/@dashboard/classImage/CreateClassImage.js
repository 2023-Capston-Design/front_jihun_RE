import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import jwtDecode from 'jwt-decode'

import { TextField, Box, Button, Typography, Modal, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { API } from '../../../config';
import Iconify from '../../../components/iconify';
import { getCookie } from '../../auth/cookie/cookie';
import { CreateClassImage } from '.';

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
export default function CreateDepartment({onCreateClassImage}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [name, setName] = useState('');
    const [imageOptions, setImageOptions] = useState('');
    const [tkn, setTkn] = useState('');
    const [ id, setId ] = useState('');

    useEffect(() => {
        const tk = getCookie("access_tk");
        setTkn(tk);
        const decodedTkn = jwtDecode(tk);
        setId(decodedTkn.user_id);
    }, []);

    const handelCreate = () => {


        axios.post(`${API.CLASSIMAGE}`, {
            "name": name,
            "instructor_id": `${id}`,
            "imageOptions": {imageOptions},
        }, {
            headers: {
                'Authorization': `Bearer ${tkn}`
            }
        }).then((response) => {
            console.log(response.data.id);
            onCreateClassImage();
        }).catch((error) => {
            console.log(error.response.data.message);
        });
    };

    return (
        <>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>
                클래스 이미지 생성
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Stack spacing={2}>
                        <Typography id="title" variant="h6" component="h2">
                            클래스 이미지 생성
                        </Typography>

                        <TextField
                            required
                            name="name"
                            label="이름"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            required
                            name="name"
                            label="이미지 옵션"
                            value={imageOptions}
                            onChange={(e) => setImageOptions(e.target.value)}
                        />

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

CreateClassImage.propTypes = {
    onCreateClassImage: PropTypes.func.isRequired,
};
import React, { useEffect, useState } from "react";
import { PropTypes } from 'prop-types';
import { Stack } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import { API } from '../../../../config'

export default function InputClassImage({ onClassImageChange }) {
    const [classImage, setClassImage] = useState('');
    const [classImages, setClassImages] = useState([]);

    useEffect(() => {
        axios.get(`${API.CLASSIMAGE}`, {
            params: {
                "page": 1,
                "pagesize": 100
            }
        }).then((response) => {
            console.log(response)
            setClassImages(response.data);
        }).catch((error) => {
            console.log(error)
        });
    }, [])

    useEffect(() => {
        onClassImageChange(classImage);
    }, [classImage, onClassImageChange])

    return (
        <FormControl>
            <InputLabel id="select_classImage">이미지 선택</InputLabel>
            <Stack spacing={2}>
                <Select
                    labelId="select_classImage"
                    id="classImage"
                    value={classImage}
                    label="이미지 선택"
                    onChange={(e) => setClassImage(e.target.value)}>
                    {classImages.map((classImage) => (
                        <MenuItem
                            key={classImage.id}
                            value={classImage.id}
                        >{classImage.name}</MenuItem>
                    ))}
                </Select>
            </Stack>
        </FormControl>
    )
}

InputClassImage.propTypes = {
    onClassImageChange: PropTypes.func.isRequired,
};

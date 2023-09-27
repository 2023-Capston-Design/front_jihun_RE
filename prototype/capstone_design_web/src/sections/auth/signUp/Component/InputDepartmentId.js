import React, { useEffect, useState } from "react";
import { PropTypes } from 'prop-types';
import { Stack,/* TextField */ } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import { API } from '../../../../config'

export default function InputDepartmentId({ onDepartmentIdChange }) {
    const [departmentId, setDepartmentId] = useState('');
    const [departments, setDepartments] = useState([]);

    /* const departmentIdChk = async (event) => {       // 부서선택을 select로 구현함에 따라 중복확인 절차가 의미 없어짐.
        const chkDepartmentId = event.target.value;
        await axios.get(`${API.DIDREAD}/${chkDepartmentId}`, 
        {
            detail: false
        }).then(() => {
            setHasError(false);
            setDepartmentId(chkDepartmentId)
        }).catch((error)=> {
            console.log(error.response.data.message)
            if (error.response.data.message === "DEPARTMENT_NOT_FOUND"){
                setHasError(true);
            }
        });
    }
 */
    /** select에 담을 부서 정보를 끌어오기 위함  */
    useEffect(() => {
        axios.get(`${API.DEPARTMENT}`, {
            params: {
                "page": 1,
                "pagesize": 100
            }
        }).then((response) => {
            console.log(response)
            setDepartments(response.data);
        }).catch((error) => {
            console.log(error)
        });
        onDepartmentIdChange(departmentId);
    }, [departmentId, onDepartmentIdChange])

    return (
        <FormControl>
            <InputLabel id="select_department">학과(부서)</InputLabel>
            <Stack spacing={2}>
                <Select
                    labelId="select_department"
                    id="department"
                    value={departmentId}
                    label="학과(부서)"
                    onChange={(e) => setDepartmentId(e.target.value)}>
                    {departments.map((department) => (
                        <MenuItem
                            key={department.id}
                            value={department.id}
                        >{department.name}</MenuItem>
                    ))}
                </Select>
            </Stack>
        </FormControl>
    )
}

InputDepartmentId.propTypes = {
    onDepartmentIdChange: PropTypes.func.isRequired,
};

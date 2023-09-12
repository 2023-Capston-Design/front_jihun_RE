import React, { useEffect, useState } from "react";
import { PropTypes } from 'prop-types';
import { TextField } from '@mui/material';
import axios from "axios";
import {API} from '../../../../config'

export default function InputDepartmentId({onDepartmentIdChange}) {
    const [departmentId, setDepartmentId] = useState('');
    const [hasError, setHasError] = useState(false);

    const departmentIdChk = async (event) => {
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



    useEffect(() => {
        onDepartmentIdChange(departmentId);
    }, [departmentId, onDepartmentIdChange])


    return(
        <TextField
          required
          name="departmentId"
          label="학과(부서) 번호"
          error = {hasError}
          helperText = {hasError ? "부서가 존재하지 않습니다." : ""}
          onBlur={departmentIdChk}
        />
    )
}

InputDepartmentId.propTypes = {
    onDepartmentIdChange: PropTypes.func.isRequired,
  };
  
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import { TextField } from '@mui/material';
import {API} from '../../../config'

export default function InputEmail({onEmailChange}) {
    const [email, setEmail] = useState('');
    const [hasError, setHasError] = useState(false);

    const emailChk = async (event) => {
        const chkEmail = event.target.value;
        console.log(chkEmail)
        await axios.get(`${API.EMAILCHK}/${chkEmail}`)
        .then((response)=>{
            console.log(response.data.msg)
            if (response.data.msg === true){
                setHasError(false);
                console.log('사용 가능')
                setEmail(chkEmail);
            }else if (response.data.msg === false) {
                setHasError(true)
                console.log('중복')
            }
        }).catch((error)=>{
            console.log(error)
        });
    };

    useEffect(()=>{
        onEmailChange(email);
    }, [email, onEmailChange])

    return(
    <TextField
          required
          name="email"
          label="이메일"
          type="email" // Set the type to "email"
          variant="outlined"
          fullWidth
          error = {hasError}
          helperText = {hasError ? "이미 존재하는 이메일입니다" : ""}
          onBlur={emailChk}
        />
    )
}

InputEmail.propTypes = {
    onEmailChange: PropTypes.func.isRequired,
  };
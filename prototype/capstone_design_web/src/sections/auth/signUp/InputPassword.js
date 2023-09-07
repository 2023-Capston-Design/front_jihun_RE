import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { IconButton, InputAdornment, TextField, } from '@mui/material';
import Iconify from '../../../components/iconify';

export default function InputPassword({ onPasswordChange }) {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordChk, setPasswordChk] = useState('');
    const [showPasswordChk, setShowPasswordChk] = useState(false);
    const [hasError, setHasError] = useState(false);

    function passwordChecking(event) {
        const newValue = event.target.value;

        if (password === newValue || passwordChk === newValue) {
            setHasError(false);


            console.log(`hi ${password}`)
            onPasswordChange(password);

        } else {
            setHasError(true);
        }
        

    };


    return (
        <>
            <TextField
                required
                name="password"
                label="비밀번호"
                type={showPassword ? 'text' : 'password'}
                onBlur={(event) => setPassword(event.target.value)}
                error={hasError}
                onChange={(event) => passwordChecking(event)}
                helperText={hasError ? '비밀번호가 일치하지 않습니다.' : ''}

                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <TextField
                required
                name="passwordChk"
                label="비밀번호 확인"
                type={showPasswordChk ? 'text' : 'password'}
                onBlur={(event) => setPasswordChk(event.target.value)}
                error={hasError}
                onChange={(event) => passwordChecking(event)}
                helperText={hasError ? '비밀번호가 일치하지 않습니다.' : ''}

                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowPasswordChk(!showPasswordChk)} edge="end">
                                <Iconify icon={showPasswordChk ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </>
    )
}

InputPassword.propTypes = {
    onPasswordChange: PropTypes.func.isRequired,
  };
  
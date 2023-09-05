import React, {useEffect, useState} from 'react';
import { TextField } from '@mui/material';

export default function InputEmail({onEmailChange}) {
    const [email, setEmail] = useState('');

    useEffect(()=>{
        onEmailChange(email);
    })

    return(
    <TextField
          required
          name="email"
          label="이메일"
          type="email" // Set the type to "email"
          variant="outlined"
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
        />
    )
}
import React, { useEffect, useState } from "react";
import { TextField } from '@mui/material';

export default function InputName({onNameChange}) {
    const [name, setName] = useState('');

    useEffect(() => {
        onNameChange(name);
    })


    return(
        <TextField
          required
          name="name"
          label="이름"
          onChange={(e) => setName(e.target.value)}
        />
    )
}
import React, { useEffect, useState } from "react";
import { PropTypes } from 'prop-types';
import { TextField } from '@mui/material';

export default function InputName({onNameChange}) {
    const [name, setName] = useState('');

    useEffect(() => {
        onNameChange(name);
    }, [name, onNameChange])


    return(
        <TextField
          required
          name="name"
          label="이름"
          onChange={(e) => setName(e.target.value)}
        />
    )
}

InputName.propTypes = {
    onNameChange: PropTypes.func.isRequired,
  };
  
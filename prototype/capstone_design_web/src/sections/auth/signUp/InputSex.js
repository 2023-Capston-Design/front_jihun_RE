import React, {useEffect, useState} from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export default function InputSex({onSexChange}) {
    const [sex, setSex] = useState('');

    useEffect(()=>{
        onSexChange(sex);
    });

    return(
        <FormControl fullWidth>
          <InputLabel id="select_sex">성별</InputLabel>
          <Select
            labelId="select_sex"
            id="sex"
            value={sex}
            label="성별"
            onChange={(e) => setSex(e.target.value)}
          >
            <MenuItem value={'male'}>남성</MenuItem>
            <MenuItem value={'female'}>여성</MenuItem>
          </Select>
        </FormControl>
    )
}
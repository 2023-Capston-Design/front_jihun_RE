import React, {useEffect, useState} from 'react';
import { PropTypes } from 'prop-types';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export default function InputMemberRole({onMemberRoleChange}) {
    const [memberRole, setMemberRole] = useState('');

    useEffect(()=>{
        onMemberRoleChange(memberRole);
    },[memberRole, onMemberRoleChange]);

    return(
        <FormControl fullWidth>
          <InputLabel id="select_memberRole">직책</InputLabel>
          <Select
            labelId="select_memberRole"
            id="memberRole"
            value={memberRole}
            label="역할"
            onChange={(e) => setMemberRole(e.target.value)}
          >
            <MenuItem value={'manager'}>관리자</MenuItem>
            <MenuItem value={'instructor'}>교수</MenuItem>
            <MenuItem value={'student'}>학생</MenuItem>
          </Select>
        </FormControl>
    )
}

InputMemberRole.propTypes = {
  onMemberRoleChange: PropTypes.func.isRequired,
};

import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Stack } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

// component
import InputDepartmentId from './InputDepartmentId';
import InputProfile from './InputProfile';


export default function InputMemberRole({ onMemberRoleChange }) {
  const [memberRole, setMemberRole] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [profile, setProfile] = useState('');
  const [additionalForm, setAdditionalForm] = useState(false);

  const handleMemberRole = (e) => {
    const memberRoleTemp = e.target.value;
    setMemberRole(memberRoleTemp);

    if (memberRoleTemp === 'instructor' || memberRoleTemp === 'student') {
      setAdditionalForm(true);
    }
    else {
      setAdditionalForm(false);
    }
  }

  useEffect(() => {
    onMemberRoleChange(memberRole, departmentId, profile);
  }, [memberRole, departmentId, profile, onMemberRoleChange]);

  return (

    <FormControl fullWidth>
      <InputLabel id="select_memberRole">직책</InputLabel>
      <Stack spacing={2} >
      <Select
        labelId="select_memberRole"
        id="memberRole"
        value={memberRole}
        label="역할"
        onChange={handleMemberRole}
      >
        <MenuItem value={'manager'}>관리자</MenuItem>
        <MenuItem value={'instructor'}>교수</MenuItem>
        <MenuItem value={'student'}>학생</MenuItem>
      </Select>

      
        {additionalForm && (
          <>
            <InputDepartmentId
              onDepartmentIdChange={(departmentId) => setDepartmentId(departmentId)}
            />
            <InputProfile
              onProfileChange={(profile) => setProfile(profile)}
            />
          </>
        )}
      </Stack>

    </FormControl>
  )
}

InputMemberRole.propTypes = {
  onMemberRoleChange: PropTypes.func.isRequired,
};

import React, {useEffect, useState} from 'react';
import { TextField } from '@mui/material';

export default function InputGroupId({onGroupIdChange}) {
    const [groupId, setGroupId] = useState('');

    useEffect(()=>{
        onGroupIdChange(groupId);
    })

    return(
        <TextField
        required
        name="groupId"
        label="학번(교번)"
        onChange={(e) => setGroupId(e.target.value)}
      />
    )
}
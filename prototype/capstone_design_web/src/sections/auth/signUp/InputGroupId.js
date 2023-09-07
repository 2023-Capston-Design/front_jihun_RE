import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import { TextField } from '@mui/material';
import {API} from '../../../config';

export default function InputGroupId({onGroupIdChange}) {
    const [groupId, setGroupId] = useState('');
    const [hasError, setHasError] = useState(false);

    const gidChk = async (event) => {
      const chkGid = event.target.value;
      await axios.get(`${API.GIDCHK}/${chkGid}`)
      .then((response)=>{
        if (response.data.msg === true){
          setHasError(false);
          console.log('가능 학번')
          setGroupId(chkGid);
        }else if (response.data.msg === false ){
          setHasError(true)
          console.log('중복 학번')
        }
      }).catch((error)=>{
        console.log(error)
      });
    };

    useEffect(()=>{
      onGroupIdChange(groupId);
    }, [groupId, onGroupIdChange])

    return(
        <TextField
        required
        name="groupId"
        label="학번(교번)"
        error = {hasError}
        helperText = {hasError ? "이미 존재하는 학번(교번)입니다." : ""}
        onBlur={gidChk}
      />
    )
}

InputGroupId.propTypes = {
    onGroupIdChange: PropTypes.func.isRequired,
  };
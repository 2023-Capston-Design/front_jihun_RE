import React, { useEffect, useState } from "react";
import { PropTypes } from 'prop-types';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function InputProfile({ onProfileChange }) {
    const [profile, setProfile] = useState('');

    const handleFileSelect = (e) => {
        const fileSelected = e.target.files[0];
        console.log(`filename: ${fileSelected}`)
        if (fileSelected) {
            setProfile(fileSelected);
        }
    }

    useEffect(() => {
        onProfileChange(profile);
    }, [profile, onProfileChange])


    return (
        <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            href="#file-upload"
        >
            Upload a file
            <VisuallyHiddenInput type="file" onChange={handleFileSelect} />
        </Button>
    )
}

InputProfile.propTypes = {
    onProfileChange: PropTypes.func.isRequired,
};

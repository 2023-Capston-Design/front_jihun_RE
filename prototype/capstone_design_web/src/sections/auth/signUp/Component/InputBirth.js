import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function InputBirth({onDateChange}) {
    const [birth, setBirth] = useState('');

    const handleDate = (date) => { // birth ('YYYY-MM-DD') 형태로 지정 후 setBirth
        date = new Date(date);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setBirth(formattedDate);
      };

      useEffect(() => {
        onDateChange(birth);
      }, [birth, onDateChange]);

    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="생년월일"
              value={birth}
              disableFuture
              views={['year', 'month', 'day']}
              onChange={handleDate}
            />
        </LocalizationProvider>
    );
};

InputBirth.propTypes = {
  onDateChange: PropTypes.func.isRequired,
};

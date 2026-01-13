import React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

function DatePickerClear(props) {
  const { onClear, cleared } = props;

  const handleDateChange = (newValue) => {
    props.onChange(newValue);
  };

  const isTextGray = props.showdate || cleared;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        {...props}
        renderInput={(params) => (
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <TextField
              sx={{
                width: '100%',
                opacity: isTextGray ? 0.7 : 1,
                color: isTextGray ? 'rgba(0, 0, 0, 0.3)' : 'black',
              }}
              {...params}
            />
            {props.value && (
              <IconButton
                style={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  right: '3rem',
                  cursor: 'pointer',
                }}
                onClick={onClear}
              >
                <ClearIcon sx={{ color: 'rgba(0, 0, 0, 0.3)' }} />
              </IconButton>
            )}
          </div>
        )}
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  );
}

export default function Datepicker({ value, setValue, value2, setValue2, showdate, setShowdate }) {
  const [cleared, setCleared] = React.useState(false);

  const handleClear = () => {
    setValue("01/01/1900");
    setValue2("2025-11-30");
    setShowdate(false);
    setCleared(true);
  };

  return (
    <Stack spacing={3}>
      <DatePickerClear
        label="From"
        openTo="day"
        views={['year', 'month', 'day']}
        inputFormat="DD/MM/YYYY"
        value={value}
        showdate={showdate}
        cleared={cleared}
        onChange={(newValue) => {
          setValue(new Date(newValue));
          setShowdate(false);
          setCleared(false);
        }}
        onClear={handleClear}
      />
      <DatePickerClear
        label="To"
        inputFormat="DD/MM/YYYY"
        openTo="day"
        views={['year', 'month', 'day']}
        value={value2}
        maxDate={new Date("2025-11-30")} 
        showdate={showdate}
        cleared={cleared}
        onChange={(newValue) => {
          setValue2(new Date(newValue));
          setShowdate(false);
          setCleared(false); 
        }}
        onClear={handleClear}
      />
    </Stack>
  );
}


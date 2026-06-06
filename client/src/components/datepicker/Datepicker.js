import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';

// Constraints
const MIN_LIMIT = dayjs('1900-01-01');
const MAX_LIMIT = dayjs('2026-03-31');

function DatePickerClear(props) {
  const { onClear, cleared, showdate, value, onChange, errorText, ...other } = props;
  const isTextGray = showdate || cleared;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        {...other}
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
            <TextField
              {...params}
              // Shows the red error text below the input
              error={!!errorText}
              helperText={errorText}
              sx={{
                width: '100%',
                // opacity: isTextGray ? 0.7 : 1,
                '& .MuiInputBase-input': {
                  color: isTextGray ? 'rgba(0, 0, 0, 0.3)' : 'black',
                },
                '& .MuiFormHelperText-root': {
                  fontWeight: 'bold',
                  margin: '4px 0 0 0'
                }
              }}
            />
            {value && (
              <IconButton
                style={{
                  position: 'absolute',
                  top: '10px', // Adjusted to keep icon centered
                  right: '3rem',
                }}
                onClick={onClear}
              >
                <ClearIcon sx={{ color: 'rgba(0, 0, 0, 0.3)' }} />
              </IconButton>
            )}
          </div>
        )}
      />
    </LocalizationProvider>
  );
}

export default function Datepicker({ value, setValue, value2, setValue2, showdate, setShowdate }) {
  const [cleared, setCleared] = useState(false);
  
  // States to hold error reasons
  const [errorFrom, setErrorFrom] = useState(null);
  const [errorTo, setErrorTo] = useState(null);

  // Function to convert MUI error codes to human-readable text
  const getErrorMessage = (reason) => {
    switch (reason) {
      case 'minDate':
        return 'Date cannot be before 01/01/1900';
      case 'maxDate':
        return 'Date cannot exceed 31/03/2026';
      case 'invalidDate':
        return 'Please enter a valid date';
      default:
        return '';
    }
  };

  const handleClear = () => {
    setValue(MIN_LIMIT);
    setValue2(MAX_LIMIT);
    setShowdate(false);
    setCleared(true);
    setErrorFrom(null);
    setErrorTo(null);
  };

  return (
    <Stack spacing={4} sx={{ mt: 1 }}>
      <DatePickerClear
        label="From"
        inputFormat="DD/MM/YYYY"
        value={value}
        minDate={MIN_LIMIT}
        maxDate={MAX_LIMIT}
        showdate={showdate}
        cleared={cleared}
        onError={(reason) => setErrorFrom(reason)}
        errorText={getErrorMessage(errorFrom)}
        onChange={(newValue) => {
          setValue(newValue);
          setShowdate(false);
          setCleared(false);
        }}
        onClear={handleClear}
      />

      <DatePickerClear
        label="To"
        inputFormat="DD/MM/YYYY"
        value={value2}
        minDate={MIN_LIMIT}
        maxDate={MAX_LIMIT}
        showdate={showdate}
        cleared={cleared}
        onError={(reason) => setErrorTo(reason)}
        errorText={getErrorMessage(errorTo)}
        onChange={(newValue) => {
          setValue2(newValue);
          setShowdate(false);
          setCleared(false);
        }}
        onClear={handleClear}
      />
    </Stack>
  );
}


// import React from 'react';
// import TextField from '@mui/material/TextField';
// import Stack from '@mui/material/Stack';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import ClearIcon from '@mui/icons-material/Clear';
// import IconButton from '@mui/material/IconButton';

// function DatePickerClear(props) {
//   const { onClear, cleared } = props;

//   const handleDateChange = (newValue) => {
//     props.onChange(newValue);
//   };

//   const isTextGray = props.showdate || cleared;

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DatePicker
//         {...props}
//         renderInput={(params) => (
//           <div style={{ position: 'relative', display: 'inline-block' }}>
//             <TextField
//               sx={{
//                 width: '100%',
//                 opacity: isTextGray ? 0.7 : 1,
//                 color: isTextGray ? 'rgba(0, 0, 0, 0.3)' : 'black',
//               }}
//               {...params}
//             />
//             {props.value && (
//               <IconButton
//                 style={{
//                   position: 'absolute',
//                   top: '50%',
//                   transform: 'translateY(-50%)',
//                   right: '3rem',
//                   cursor: 'pointer',
//                 }}
//                 onClick={onClear}
//               >
//                 <ClearIcon sx={{ color: 'rgba(0, 0, 0, 0.3)' }} />
//               </IconButton>
//             )}
//           </div>
//         )}
//         onChange={handleDateChange}
//       />
//     </LocalizationProvider>
//   );
// }

// export default function Datepicker({ value, setValue, value2, setValue2, showdate, setShowdate }) {
//   const [cleared, setCleared] = React.useState(false);

//   const handleClear = () => {
//     setValue("01/01/1900");
//     // setValue2("2023-05-31");
//     setValue2("2024-12-31");
//     setShowdate(false);
//     setCleared(true);
//   };

//   return (
//     <Stack spacing={3}>
//       <DatePickerClear
//         label="From"
//         openTo="day"
//         views={['year', 'month', 'day']}
//         inputFormat="DD/MM/YYYY"
//         value={value}
//         showdate={showdate}
//         cleared={cleared}
//         onChange={(newValue) => {
//           setValue(new Date(newValue));
//           setShowdate(false);
//           setCleared(false);
//         }}
//         onClear={handleClear}
//       />
//       <DatePickerClear
//         label="To"
//         inputFormat="DD/MM/YYYY"
//         openTo="day"
//         views={['year', 'month', 'day']}
//         value={value2}
//         maxDate={new Date("2024-05-31")} 
//         showdate={showdate}
//         cleared={cleared}
//         onChange={(newValue) => {
//           setValue2(new Date(newValue));
//           setShowdate(false);
//           setCleared(false); 
//         }}
//         onClear={handleClear}
//       />
//     </Stack>
//   );
// }


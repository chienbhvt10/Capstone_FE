import { Autocomplete, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

interface Props {}

const FilterTable = (props: Props) => {
  const [year, setYear] = useState<Dayjs | null>(dayjs('2022-04-07'));

  return (
    <Stack direction="row" sx={{ my: 2 }}>
      <Box sx={{ width: 250 }}>
        <DatePicker
          views={['year']}
          label="Year only"
          value={year}
          onChange={(newValue) => {
            setYear(newValue);
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </Box>
      <Box sx={{ width: 250 }}>
        <Autocomplete
          disablePortal
          options={['Spring', 'Summer', 'Fall']}
          renderInput={(params) => (
            <TextField {...params} label="Select Semester" />
          )}
        />
      </Box>
      <Box sx={{ width: 250 }}>
        <Autocomplete
          disablePortal
          options={['Spring', 'Summer', 'Fall']}
          renderInput={(params) => (
            <TextField {...params} label="Select Lecturer" />
          )}
        />
      </Box>
    </Stack>
  );
};

export default FilterTable;

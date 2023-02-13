import {
  Stack,
  Typography,
  Grid,
  TextField,
  Autocomplete,
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import TimeTableSelectSlot from '~/components/TimeTableSelectSlot';

interface Props {
  title: string;
}

interface Option {
  id: number;
  label: string;
}

const options: Option[] = [
  {
    id: 1,
    label: 'value1',
  },
  {
    id: 2,
    label: 'value2',
  },
  {
    id: 3,
    label: 'value3',
  },
  {
    id: 4,
    label: 'value4',
  },
];

const selectedOptions: Option[] = [
  {
    id: 1,
    label: 'value1',
  },
];

const RegisterScheduleForm = (props: Props) => {
  const { title } = props;
  const [subjectsSelector, setSubjectsSelector] = useState(selectedOptions);

  const onChangeSubjectsSelector = (
    event: SyntheticEvent,
    newValue: Option[]
  ) => {
    setSubjectsSelector(newValue);
  };
  return (
    <Stack direction="column">
      <Typography variant="h5" align="center">
        {title}
      </Typography>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item xs={2}>
            <Typography variant="body1">Priority Subject</Typography>
          </Grid>
          <Grid item xs={10}>
            <Autocomplete
              sx={{ maxWidth: 300 }}
              size="small"
              multiple
              disableCloseOnSelect
              filterSelectedOptions
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => {
                return option.id === value.id;
              }}
              options={options}
              value={subjectsSelector}
              onChange={onChangeSubjectsSelector}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" />
              )}
            />
          </Grid>
        </Grid>
        <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item xs={2}>
            <Typography variant="body1">Slot</Typography>
          </Grid>
          <Grid item xs={10}>
            <TimeTableSelectSlot />
          </Grid>
        </Grid>
        <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item xs={2}>
            <Typography variant="body1">Number of classes</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField variant="outlined" sx={{ maxWidth: 300 }} />
          </Grid>
        </Grid>
        <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item xs={2}>
            <Typography variant="body1">Note</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              multiline
              rows={4}
              variant="outlined"
              sx={{ maxWidth: 600 }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default RegisterScheduleForm;

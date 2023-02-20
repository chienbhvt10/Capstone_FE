import {
  Stack,
  Typography,
  Grid,
  TextField,
  Autocomplete,
  Button,
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';

interface Props {
  title: string;
}

interface Option {
  id: number;
  label: string;
  description: string;
}

const options1: Option[] = [
  {
    id: 1,
    label: 'CSI101',
    description: 'description',
  },
  {
    id: 2,
    label: 'MAS292',
    description: 'description',
  },
  {
    id: 3,
    label: 'SWP492',
    description: 'description',
  },
  {
    id: 4,
    label: 'value4',
    description: 'description',
  },
];

const options2: Option[] = [
  {
    id: 1,
    label: 'A24',
    description: 'Morning Mon-Slot1, Wed-Slot2',
  },
  {
    id: 2,
    label: 'A42',
    description: 'Morning Wed-Slot1, Mon-Slot2',
  },
  {
    id: 3,
    label: 'P24',
    description: 'Evening Mon-Slot3, Wed-Slot4',
  },
  {
    id: 4,
    label: 'P42',
    description: 'Evening Mon-Slot4, Wed-Slot3',
  },
];

const RegisterScheduleForm = (props: Props) => {
  const { title } = props;
  const [subjectOptions, setSubjectOptions] = useState<Option[]>(options1);
  const [slotOptions, setSlotOptions] = useState<Option[]>(options2);
  const [subjectsSelector, setSubjectsSelector] = useState<Option[]>([]);
  const [slotsSelector, setSlotsSelector] = useState<Option[]>([]);

  const onSubmitRegister = () => {};

  const onChangeSubjectsSelector = (
    event: SyntheticEvent,
    newValue: Option[]
  ) => {
    if (newValue === null) {
      setSubjectsSelector([]);
      return;
    }
    setSubjectsSelector(newValue);
  };

  const onChangeSlotSelector = (event: SyntheticEvent, newValue: Option[]) => {
    if (newValue === null) {
      setSlotsSelector([]);
      return;
    }
    setSlotsSelector(newValue);
  };

  return (
    <Stack direction="column" sx={{ alignItems: 'center' }}>
      <Typography variant="h6" align="center">
        {title}
      </Typography>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item xs={2}>
            <Typography variant="body1">Subject</Typography>
          </Grid>
          <Grid item xs={10}>
            <Autocomplete
              sx={{ maxWidth: 400 }}
              size="small"
              multiple
              disableCloseOnSelect
              filterSelectedOptions
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => {
                return option.id === value.id;
              }}
              options={subjectOptions}
              renderOption={(props, option, { selected }) => (
                <Stack component="li" {...props}>
                  <Typography variant="body2">{option.label}</Typography>
                  <Typography variant="body2">-</Typography>
                  <Typography variant="body2">{option.description}</Typography>
                </Stack>
              )}
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
            <Autocomplete
              sx={{ maxWidth: 400 }}
              size="small"
              multiple
              disableCloseOnSelect
              filterSelectedOptions
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => {
                return option.id === value.id;
              }}
              options={slotOptions}
              renderOption={(props, option, { selected }) => (
                <Stack component="li" {...props}>
                  <Typography variant="body2">{option.label}</Typography>
                  <Typography variant="body2">-</Typography>
                  <Typography variant="body2">{option.description}</Typography>
                </Stack>
              )}
              value={slotsSelector}
              onChange={onChangeSlotSelector}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" />
              )}
            />
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
      <Button onClick={onSubmitRegister} size="medium">
        Register
      </Button>
    </Stack>
  );
};

export default RegisterScheduleForm;

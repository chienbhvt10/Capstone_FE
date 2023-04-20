import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { SyntheticEvent, useState } from 'react';

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

interface Props {
  onCloseExpectedPriorityPopup: () => void;
  open: boolean;
}

const ExpectedPriorityPopup = (props: Props) => {
  const { open, onCloseExpectedPriorityPopup } = props;
  const [prioritySubjectsSelector, setPrioritySubjectsSelector] =
    useState(selectedOptions);
  const [priorityClassesSelector, setPriorityClassesSelector] =
    useState(selectedOptions);
  const [prioritySlotsSelector, setPrioritySlotsSelector] =
    useState(selectedOptions);
  const [blockSubjectsSelector, setBlockSubjectsSelector] =
    useState(selectedOptions);

  const onChangePrioritySubjectsSelector = (
    event: SyntheticEvent,
    newValue: Option[]
  ) => {
    setPrioritySubjectsSelector(newValue);
  };

  const onChangeBlockSubjectsSelector = (
    event: SyntheticEvent,
    newValue: Option[]
  ) => {
    setBlockSubjectsSelector(newValue);
  };

  const onChangePriorityClassesSelector = (
    event: SyntheticEvent,
    newValue: Option[]
  ) => {
    setPriorityClassesSelector(newValue);
  };

  const onChangePrioritySlotsSelector = (
    event: SyntheticEvent,
    newValue: Option[]
  ) => {
    setPrioritySlotsSelector(newValue);
  };

  const onEditLecturer = () => {};

  return (
    <Dialog
      open={open}
      maxWidth="xs"
      keepMounted
      onClose={onCloseExpectedPriorityPopup}
    >
      <DialogContent sx={{ height: 400 }}>
        <Typography variant="h6" align="center" sx={{ mb: 3 }}>
          Set Lecturer’s expected Priority
        </Typography>

        <Grid container spacing={2}>
          <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid item xs={4}>
              <Typography variant="body2">Priority Subject</Typography>
            </Grid>
            <Grid item xs={8}>
              <Autocomplete
                size="small"
                multiple
                disableCloseOnSelect
                filterSelectedOptions
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => {
                  return option.id === value.id;
                }}
                options={options}
                value={prioritySubjectsSelector}
                onChange={onChangePrioritySubjectsSelector}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid item xs={4}>
              <Typography variant="body2">Priority Slot</Typography>
            </Grid>
            <Grid item xs={8}>
              <Autocomplete
                size="small"
                multiple
                disableCloseOnSelect
                filterSelectedOptions
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => {
                  return option.id === value.id;
                }}
                options={options}
                value={prioritySlotsSelector}
                onChange={onChangePrioritySlotsSelector}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid item xs={4}>
              <Typography variant="body2">Priority classes</Typography>
            </Grid>
            <Grid item xs={8}>
              <Autocomplete
                size="small"
                multiple
                disableCloseOnSelect
                filterSelectedOptions
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => {
                  return option.id === value.id;
                }}
                options={options}
                value={priorityClassesSelector}
                onChange={onChangePriorityClassesSelector}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid item xs={4}>
              <Typography variant="body2">Block Subject</Typography>
            </Grid>
            <Grid item xs={8}>
              <Autocomplete
                size="small"
                multiple
                disableCloseOnSelect
                filterSelectedOptions
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => {
                  return option.id === value.id;
                }}
                options={options}
                value={blockSubjectsSelector}
                onChange={onChangeBlockSubjectsSelector}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          spacing={2}
          sx={{ alignItems: 'center', justifyContent: 'center', my: 2 }}
        >
          <Grid item xs={4}>
            <Button onClick={onEditLecturer}>Edit Lecturer</Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ExpectedPriorityPopup;

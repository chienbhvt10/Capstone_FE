import { Grid, TextField, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Row } from '../utils/type';
import Box from '@mui/material/Box/Box';
import { Autocomplete } from '@mui/lab';
import { SyntheticEvent, useState } from 'react';
import TimeTableSelectSlot from '~/components/TimeTableSelectSlot';

interface Props {
  onCloseDetailLecturerPopup: () => void;
  open: boolean;
  itemShow: Row | null;
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

const DetailLecturerPopup = (props: Props) => {
  const { open, onCloseDetailLecturerPopup, itemShow } = props;
  const [expectedSubjectsSelector, setExpectedSubjectsSelector] =
    useState(selectedOptions);

  const onChangeExpectedSubjectsSelector = (
    event: SyntheticEvent,
    newValue: Option[]
  ) => {
    setExpectedSubjectsSelector(newValue);
  };

  return (
    <Dialog
      open={open}
      maxWidth={'md'}
      keepMounted
      onClose={onCloseDetailLecturerPopup}
      //   PaperProps={{ sx: { p: 2 } }}
    >
      <DialogContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Typography
            variant="body2"
            align="right"
            sx={{
              border: '1px solid',
              borderColor: 'success.main',
              color: 'success.main',
              px: 0.5,
            }}
          >
            APPROVE
          </Typography>
        </Box>
        <Typography variant="h5" align="center" sx={{ mb: 3 }}>
          Lecturer's Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              <Grid item xs={4}>
                <Typography variant="body2">Lecturer Name</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  variant="outlined"
                  value={itemShow?.fullName}
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              <Grid item xs={4}>
                <Typography variant="body2">Position</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  variant="outlined"
                  value={itemShow?.fullName}
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              <Grid item xs={4}>
                <Typography variant="body2">Short Name</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  variant="outlined"
                  value={itemShow?.fullName}
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              <Grid item xs={4}>
                <Typography variant="body2">Department</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  variant="outlined"
                  value={itemShow?.fullName}
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              <Grid item xs={4}>
                <Typography variant="body2">Phone Number</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  variant="outlined"
                  value={itemShow?.fullName}
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              <Grid item xs={4}>
                <Typography variant="body2">Full-time Lecturer</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  variant="outlined"
                  value={itemShow?.fullName}
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              <Grid item xs={4}>
                <Typography variant="body2">Email</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  variant="outlined"
                  value={itemShow?.fullName}
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              <Grid item xs={4}>
                <Typography variant="body2">Min of classes Quota</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  variant="outlined"
                  value={itemShow?.fullName}
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              <Grid item xs={4}>
                <Typography variant="body2">Expected Subject</Typography>
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
                  value={expectedSubjectsSelector}
                  onChange={onChangeExpectedSubjectsSelector}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              <Grid item xs={4}>
                <Typography variant="body2">
                  Expected number of classes
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  variant="outlined"
                  value={itemShow?.fullName}
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
              <Grid item xs={2}>
                <Typography variant="body2">Expected Slot</Typography>
              </Grid>
              <Grid item xs={10}>
                <TimeTableSelectSlot />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
              <Grid item xs={2}>
                <Typography variant="body2">Note</Typography>
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
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default DetailLecturerPopup;

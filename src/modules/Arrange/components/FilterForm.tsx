import { Box, Container } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete/Autocomplete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField/TextField';
import { Stack } from '@mui/system';
import { SyntheticEvent, useState } from 'react';

type Props = {};

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

const FilterForm = (props: Props) => {
  const [semestersSelector, setSemestersSelector] = useState(selectedOptions);
  const [lecturersSelector, setLecturersSelector] = useState(selectedOptions);
  const [classesSelector, setClassesSelector] = useState(selectedOptions);
  const [roomsSelector, setRoomsSelector] = useState(selectedOptions);
  const [subjectsSelector, setSubjectsSelector] = useState(selectedOptions);

  const onChangeSemestersSelector = (
    event: SyntheticEvent,
    newValue: Option[]
  ) => {
    setSemestersSelector(newValue);
  };

  const onChangeLecturersSelector = (
    event: SyntheticEvent,
    newValue: Option[]
  ) => {
    setLecturersSelector(newValue);
  };

  const onChangeClassesSelector = (
    event: SyntheticEvent,
    newValue: Option[]
  ) => {
    setClassesSelector(newValue);
  };

  const onChangeRoomsSelector = (event: SyntheticEvent, newValue: Option[]) => {
    setRoomsSelector(newValue);
  };

  const onChangeSubjectsSelector = (
    event: SyntheticEvent,
    newValue: Option[]
  ) => {
    setSubjectsSelector(newValue);
  };

  const onSearch = () => {};

  return (
    <Box sx={{ border: '1px solid #ccc', p: 2, borderRadius: 1 }}>
      <Container maxWidth="lg">
        <Stack direction="column" spacing={2}>
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
            <Autocomplete
              sx={{ maxWidth: 300, width: 1 }}
              size="small"
              multiple
              disableCloseOnSelect
              filterSelectedOptions
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => {
                return option.id === value.id;
              }}
              options={options}
              value={semestersSelector}
              onChange={onChangeSemestersSelector}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select Semester"
                />
              )}
            />
            <Autocomplete
              sx={{ maxWidth: 300, width: 1 }}
              size="small"
              multiple
              disableCloseOnSelect
              filterSelectedOptions
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => {
                return option.id === value.id;
              }}
              options={options}
              value={lecturersSelector}
              onChange={onChangeLecturersSelector}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select Lecturers"
                />
              )}
            />
            <Autocomplete
              sx={{ maxWidth: 300, width: 1 }}
              size="small"
              multiple
              disableCloseOnSelect
              filterSelectedOptions
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => {
                return option.id === value.id;
              }}
              options={options}
              value={classesSelector}
              onChange={onChangeClassesSelector}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select Classes"
                />
              )}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Autocomplete
              sx={{ maxWidth: 300, width: 1 }}
              size="small"
              multiple
              disableCloseOnSelect
              filterSelectedOptions
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => {
                return option.id === value.id;
              }}
              options={options}
              value={roomsSelector}
              onChange={onChangeRoomsSelector}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select Rooms"
                />
              )}
            />
            <Autocomplete
              sx={{ maxWidth: 300, width: 1 }}
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
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select Subjects"
                />
              )}
            />
            <Button onClick={onSearch} size="medium">
              Search
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default FilterForm;

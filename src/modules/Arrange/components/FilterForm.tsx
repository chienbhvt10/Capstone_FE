import { Box, Container } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete/Autocomplete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField/TextField';
import { Stack } from '@mui/system';
import { SyntheticEvent, useState } from 'react';
import useArrange from '~/hooks/useArrange';
import { Lecturer } from '~/modules/Lecturer/util/type';
import { Room } from '~/modules/Setting/Rooms/util/type';
import { Subject } from '~/modules/Setting/Subjects/util/type';
import { Class } from '../utils/type';
import { searchTask } from '~/services/arrange';

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

const FilterForm = () => {
  const {
    rooms,
    lecturers,
    subjects,
    classes,
    setLoadingTimeTable,
    setLecturersTaskAssignInfo,
    setTasksNotAssigned,
    refetch,
  } = useArrange();
  const [semestersSelector, setSemestersSelector] = useState<Option | null>(
    null
  );
  const [lecturersSelector, setLecturersSelector] = useState<Lecturer[]>([]);
  const [classesSelector, setClassesSelector] = useState<Class[]>([]);
  const [roomsSelector, setRoomsSelector] = useState<Room[]>([]);
  const [subjectsSelector, setSubjectsSelector] = useState<Subject[]>([]);

  const onChangeSemestersSelector = (
    event: SyntheticEvent,
    newValue: Option | null
  ) => {
    setSemestersSelector(newValue);
  };

  const onChangeLecturersSelector = (
    event: SyntheticEvent,
    newValue: Lecturer[]
  ) => {
    setLecturersSelector(newValue);
  };

  const onChangeClassesSelector = (
    event: SyntheticEvent,
    newValue: Class[]
  ) => {
    setClassesSelector(newValue);
  };

  const onChangeRoomsSelector = (event: SyntheticEvent, newValue: Room[]) => {
    setRoomsSelector(newValue);
  };

  const onChangeSubjectsSelector = (
    event: SyntheticEvent,
    newValue: Subject[]
  ) => {
    setSubjectsSelector(newValue);
  };

  const onSearch = async () => {
    try {
      setLoadingTimeTable(true);
      const res = await searchTask({
        classIds: classesSelector.map((item) => item.id),
        lecturerIds: lecturersSelector.map((item) => item.id),
        roomId: roomsSelector.map((item) => item.id),
        subjectIds: subjectsSelector.map((item) => item.id),
        semesterId: semestersSelector?.id || 0,
      });

      if (res.data?.dataAssign && res.data.dataAssign.length > 0) {
        setLecturersTaskAssignInfo(res.data.dataAssign);
      }

      if (
        res.data?.dataNotAssign &&
        res.data.dataNotAssign.timeSlotInfos &&
        res.data.dataNotAssign.timeSlotInfos.length > 0
      ) {
        setTasksNotAssigned(res.data.dataNotAssign);
      }
    } catch (err) {
    } finally {
      setLoadingTimeTable(false);
    }
  };

  const onClearSearch = () => {
    setSubjectsSelector([]);
    setRoomsSelector([]);
    setClassesSelector([]);
    setLecturersSelector([]);
    setSemestersSelector(null);
    refetch();
  };

  return (
    <Box
      id="scroll-filter-form"
      sx={{ border: '1px solid #ccc', p: 1, borderRadius: 1, width: 1, mr: 2 }}
    >
      <Stack direction="column" spacing={1}>
        <Stack direction="row" spacing={2}>
          <Autocomplete
            sx={{ maxWidth: 250, width: 1 }}
            size="small"
            multiple
            disableCloseOnSelect
            filterSelectedOptions
            getOptionLabel={(option) => option.shortName}
            isOptionEqualToValue={(option, value) => {
              return option.id === value.id;
            }}
            options={lecturers}
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
            sx={{ maxWidth: 250, width: 1 }}
            size="small"
            multiple
            disableCloseOnSelect
            filterSelectedOptions
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => {
              return option.id === value.id;
            }}
            options={classes}
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
          <Autocomplete
            sx={{ maxWidth: 220, width: 1 }}
            size="small"
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
        </Stack>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Autocomplete
            sx={{ maxWidth: 250, width: 1 }}
            size="small"
            multiple
            disableCloseOnSelect
            filterSelectedOptions
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => {
              return option.id === value.id;
            }}
            options={rooms}
            value={roomsSelector}
            onChange={onChangeRoomsSelector}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Select Rooms" />
            )}
          />
          <Autocomplete
            sx={{ maxWidth: 250, width: 1 }}
            size="small"
            multiple
            disableCloseOnSelect
            filterSelectedOptions
            getOptionLabel={(option) => option.code}
            isOptionEqualToValue={(option, value) => {
              return option.id === value.id;
            }}
            options={subjects}
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
          <Button onClick={onClearSearch} size="medium">
            Clear
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default FilterForm;

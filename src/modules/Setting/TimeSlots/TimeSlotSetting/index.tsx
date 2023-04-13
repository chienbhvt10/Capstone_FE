import { Button, Container, Stack } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete/Autocomplete';
import TextField from '@mui/material/TextField/TextField';
import {
  Fragment,
  SyntheticEvent,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import useRefresh from '~/hooks/useRefresh';
import { CreateSegmentData, Slot } from '../utils/type';
import CreateTimeSlotDialog from './components/CreateDialog';
import SlotPerDay from './components/SlotPerDay';
import TimeSlotTable from './components/TimeSlotTable';
import TimeTableSelectSlot from './components/TimeTableSelectSlot';
import useArrange from '~/hooks/useArrange';
import { Semester } from '~/modules/Semester/util/type';

const TimeSlotSetting = () => {
  const { semesters, currentSemester } = useArrange();
  const [numberSlots, setNumberSlots] = useState<number>(4);
  const [currentSlots, setCurrentSlots] = useState<Slot[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState<boolean>(false);
  const [refresh, refetch] = useRefresh();
  const [semestersSelector, setSemestersSelector] = useState<Semester | null>(
    null
  );

  useLayoutEffect(() => {
    setSemestersSelector(currentSemester);
  }, [currentSemester]);

  useEffect(() => {
    if (numberSlots > 0) {
      let newCurrentSlots: Slot[] = [];
      for (let i = 1; i <= numberSlots; i++) {
        newCurrentSlots = [
          ...newCurrentSlots,
          {
            id: i,
            slotDays: [
              {
                id: 1,
                selected: false,
              },
              {
                id: 2,
                selected: false,
              },
              {
                id: 3,
                selected: false,
              },
              {
                id: 4,
                selected: false,
              },
              {
                id: 5,
                selected: false,
              },
              {
                id: 6,
                selected: false,
              },
            ],
          },
        ];
      }
      setCurrentSlots(newCurrentSlots);
    }
  }, [numberSlots, refresh]);

  const onGetValueSegment = (): CreateSegmentData[] => {
    let newArray: CreateSegmentData[] = [];
    currentSlots.forEach((slot) => {
      const newSlotDay = slot.slotDays.forEach((day) => {
        if (day.selected) {
          newArray = [...newArray, { day: day.id, segment: slot.id }];
        }
      });
      return newSlotDay;
    });

    for (let day = 1; day <= 7; day++) {
      if (!newArray.map((item) => item.day).includes(day)) {
        newArray = [...newArray, { day: day, segment: 0 }];
      }
    }

    return newArray;
  };

  const onShowCreateDialog = () => {
    setShowCreateDialog(true);
  };

  const onCloseCreateDialog = () => {
    setShowCreateDialog(false);
  };

  const onChangeSemestersSelector = (
    event: SyntheticEvent,
    newValue: Semester | null
  ) => {
    setSemestersSelector(newValue);
    refetch();
  };

  return (
    <Fragment>
      <Container maxWidth="lg">
        <SlotPerDay
          currentSlots={currentSlots}
          numberSlots={numberSlots}
          setCurrentSlots={setCurrentSlots}
          setNumberSlots={setNumberSlots}
        />
        <TimeTableSelectSlot
          currentSlots={currentSlots}
          setCurrentSlots={setCurrentSlots}
        />
        <Stack
          direction="row"
          sx={{ alignItems: 'center', justifyContent: 'center', mb: 1 }}
        >
          <Button onClick={onShowCreateDialog} sx={{ mt: 2 }}>
            Create TimeSlot
          </Button>
        </Stack>
      </Container>
      <Container maxWidth="lg">
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Autocomplete
            sx={{ width: 1, maxWidth: 250 }}
            size="small"
            filterSelectedOptions
            getOptionLabel={(option) => `${option.semester} ${option.year}`}
            isOptionEqualToValue={(option, value) => {
              return option.id === value.id;
            }}
            options={semesters}
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
          {semestersSelector?.id !== currentSemester?.id && (
            <Button>Reuse for current semester</Button>
          )}
        </Stack>
      </Container>
      <Container maxWidth="lg">
        <TimeSlotTable
          refresh={refresh}
          refetch={refetch}
          numberSlots={numberSlots}
        />
      </Container>
      <CreateTimeSlotDialog
        open={showCreateDialog}
        onGetValueSegment={onGetValueSegment}
        onCloseCreateDialog={onCloseCreateDialog}
        refetch={refetch}
      />
    </Fragment>
  );
};

export default TimeSlotSetting;

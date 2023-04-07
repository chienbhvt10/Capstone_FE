import { Button, Container, Stack } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { CreateSegmentData, Slot } from '../utils/type';
import SlotPerDay from './components/SlotPerDay';
import TimeSlotTable from './components/TimeSlotTable';
import TimeTableSelectSlot from './components/TimeTableSelectSlot';
import CreateTimeSlotDialog from './components/CreateDialog';
import useRefresh from '~/hooks/useRefresh';

const TimeSlotSetting = () => {
  const [numberSlots, setNumberSlots] = useState<number>(4);
  const [currentSlots, setCurrentSlots] = useState<Slot[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState<boolean>(false);
  const [refresh, refetch] = useRefresh();

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
              {
                id: 7,
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
        <TimeSlotTable refresh={refresh} numberSlots={numberSlots} />
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

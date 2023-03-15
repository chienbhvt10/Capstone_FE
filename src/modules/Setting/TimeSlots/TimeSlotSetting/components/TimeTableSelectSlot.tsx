import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Fragment, useState } from 'react';
import { Button, ButtonGroup, Container, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import { slotColumns, timeSlotColumns } from '../../utils/columns';
import TableToolCustom from '~/components/TableComponents/TableToolCustom';

interface Props {}

interface SlotDay {
  id: string;
  day: string;
  slotName: string;
  selected?: boolean;
}

interface Slot {
  id: string;
  name: string;
  slotDays: SlotDay[];
}

interface TimeSlot {
  id: string;
  name: string;
  slotSelected: SlotDay[];
}

const TimeTableSelectSlot = (props: Props) => {
  const [numberSlots, setNumberSlots] = useState<number>(0);
  const [currentSlots, setCurrentSlots] = useState<Slot[]>([]);
  const [slotSelects, setSlotSelects] = useState<Slot[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    {
      id: '1',
      name: 'A24',
      slotSelected: [
        {
          id: 'MON_Slot1',
          slotName: 'Slot 1',
          day: 'MON',
        },
        {
          id: '',
          slotName: '',
          day: 'TUE',
        },
        {
          id: 'WED_SLOT2',
          slotName: 'Slot 2',
          day: 'WED',
        },
        {
          id: '',
          slotName: '',
          day: 'THU',
        },
        {
          id: '',
          slotName: '',
          day: 'FRI',
        },
        {
          id: '',
          slotName: '',
          day: 'SAT',
        },
        {
          id: '',
          slotName: '',
          day: 'SUN',
        },
      ],
    },
  ]);

  const onCreateTimeSlot = () => {};

  const onSetSlotsSelect = (slot: Slot, slotDay: SlotDay) => () => {
    const selectedSlot = currentSlots?.filter((item) => item.id === slot.id)[0];
    const newSlotDayList = selectedSlot.slotDays?.map((item) => {
      if (item.id === slotDay.id) {
        return {
          ...item,
          selected: true,
        };
      }
      return item;
    });

    const selectedItem = { ...selectedSlot, slotDays: newSlotDayList };
    setSlotSelects([...slotSelects, selectedItem]);
    const newCurrentSlots = currentSlots.map((item) => {
      if (item.id === selectedItem.id) {
        return selectedItem;
      }
      return item;
    });
    console.log(newCurrentSlots);
    setCurrentSlots(newCurrentSlots);
  };

  const onIncrementSlot = () => {
    setNumberSlots((numberSlots) => numberSlots + 1);
    setCurrentSlots((currentSlot) => [
      ...currentSlot,
      {
        id: 'number-slot-' + (numberSlots + 1),
        name: 'Slot ' + (numberSlots + 1),
        slotDays: [
          {
            id: '1',
            slotName: 'Slot ' + (numberSlots + 1),
            selected: false,
            day: 'MON',
          },
          {
            id: '2',
            slotName: 'Slot ' + (numberSlots + 1),
            selected: false,
            day: 'TUE',
          },
          {
            id: '3',
            slotName: 'Slot ' + (numberSlots + 1),
            selected: false,
            day: 'WED',
          },
          {
            id: '4',
            slotName: 'Slot ' + (numberSlots + 1),
            selected: false,
            day: 'THU',
          },
          {
            id: '5',
            slotName: 'Slot ' + (numberSlots + 1),
            selected: false,
            day: 'FRI',
          },
          {
            id: '6',
            slotName: 'Slot ' + (numberSlots + 1),
            selected: false,
            day: 'SAT',
          },
          {
            id: '7',
            slotName: 'Slot ' + (numberSlots + 1),
            selected: false,
            day: 'SUN',
          },
        ],
      },
    ]);
  };

  const onDecrementSlot = () => {
    setNumberSlots((numberSlots) => {
      if (numberSlots > 0) {
        return numberSlots - 1;
      }
      return 0;
    });
    setCurrentSlots((currentSlot) => {
      if (numberSlots > 0) {
        currentSlot.pop();
        return currentSlot;
      }
      return [];
    });
  };

  const onClearSelection = () => {
    setSlotSelects([]);
    const newCurrentSlots = currentSlots.map((item) => ({
      ...item,
      slotDays: item.slotDays.map((item) => ({ ...item, selected: false })),
    }));
    setCurrentSlots(newCurrentSlots);
  };

  const onEdit = (item: any) => () => {};

  const onDelete = (item: any) => () => {};

  return (
    <Fragment>
      <Container maxWidth="lg">
        <Stack
          direction="row"
          sx={{ alignItems: 'center', justifyContent: 'center', mb: 1 }}
        >
          <Typography variant="body2">Number of slot(s)/day</Typography>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button
              onClick={onDecrementSlot}
              size="small"
              sx={{ backgroundColor: 'primary.light' }}
            >
              <RemoveIcon />
            </Button>
            <Button disabled size="small">
              {numberSlots >= 0 && numberSlots}
            </Button>
            <Button
              onClick={onIncrementSlot}
              size="small"
              sx={{ backgroundColor: 'primary.light' }}
            >
              <AddIcon />
            </Button>
          </ButtonGroup>
          <Button onClick={onClearSelection}>Clear Selection</Button>
        </Stack>
        <TableContainer
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ borderSpacing: 2 }}
          >
            <TableHead>
              <TableRow>
                {slotColumns.map((item) => (
                  <TableCellCustom
                    key={item.id}
                    align={item.align}
                    minWidth={item.minWidth}
                    minHeight={item.minHeight}
                  >
                    {item.label}
                  </TableCellCustom>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentSlots.map((item, index) => (
                <TableRow role="checkbox" tabIndex={-1} key={index + 1}>
                  <TableCellCustom
                    key={index + 1}
                    align="center"
                    border={true}
                    hover={true}
                  >
                    {item.name}
                  </TableCellCustom>
                  {item.slotDays?.map((slot, index) => (
                    <TableCellCustom
                      key={index + 2}
                      align="center"
                      border={true}
                      onClick={onSetSlotsSelect(item, slot)}
                      backgroundEmphasize={slot.selected}
                    >
                      {' '}
                    </TableCellCustom>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack
          direction="row"
          sx={{ alignItems: 'center', justifyContent: 'center', mb: 1 }}
        >
          <Button onClick={onCreateTimeSlot} sx={{ mt: 2 }}>
            Create TimeSlot
          </Button>
        </Stack>
      </Container>
      <Container maxWidth="lg">
        <TableContainer
          sx={{
            maxWidth: 1200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ borderSpacing: 2 }}
          >
            <TableHead>
              <TableRow>
                {timeSlotColumns.map((item) => (
                  <TableCellCustom
                    key={item.id}
                    align={item.align}
                    minWidth={item.minWidth}
                    minHeight={item.minHeight}
                  >
                    {item.label}
                  </TableCellCustom>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {timeSlots.map((item, index) => (
                <TableRow role="checkbox" tabIndex={-1} key={index + 1}>
                  <TableCellCustom
                    key={index + 1}
                    align="center"
                    border={true}
                    hover={true}
                  >
                    {item.name}
                  </TableCellCustom>
                  {item.slotSelected?.map((slot, index) => (
                    <TableCellCustom
                      key={index + 2}
                      align="center"
                      border={true}
                      hover={true}
                    >
                      {slot.slotName}
                    </TableCellCustom>
                  ))}
                  <TableCellCustom align="center" border={true} hover={true}>
                    <TableToolCustom
                      item={item}
                      onDelete={onDelete}
                      displayEditButton={false}
                    />
                  </TableCellCustom>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Fragment>
  );
};

export default TimeTableSelectSlot;

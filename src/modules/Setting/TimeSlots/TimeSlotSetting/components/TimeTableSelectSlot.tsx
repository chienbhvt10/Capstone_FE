import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import { slotColumns } from '../../utils/columns';
import { Slot, SlotDay } from '../../utils/type';

interface Props {
  currentSlots: Slot[];
  setCurrentSlots: React.Dispatch<React.SetStateAction<Slot[]>>;
}

const TimeTableSelectSlot = (props: Props) => {
  const { currentSlots, setCurrentSlots } = props;

  const onSetSlotsSelect = (slot: Slot, slotDay: SlotDay) => () => {
    const newCurrentSlots = currentSlots.map((item) => {
      if (item.id === slot.id) {
        const newSlotDay = item.slotDays.map((sd) => {
          if (slotDay.id === sd.id) {
            return {
              ...slotDay,
              selected: !slotDay.selected,
            };
          }
          return sd;
        });
        return { ...item, slotDays: newSlotDay };
      }
      return item;
    });
    setCurrentSlots(newCurrentSlots);
  };

  return (
    <TableContainer
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Table stickyHeader aria-label="sticky table" sx={{ borderSpacing: 2 }}>
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
          {currentSlots?.length &&
            currentSlots.map((item) => (
              <TableRow role="checkbox" tabIndex={-1} key={item.id}>
                <TableCellCustom align="center" border={true} hover={true}>
                  {item.id}
                </TableCellCustom>
                {item.slotDays?.map((slot) => (
                  <TableCellCustom
                    key={slot.id + item.id + 2}
                    align="center"
                    border={true}
                    onClick={onSetSlotsSelect(item, slot)}
                    backgroundEmphasize={slot.selected}
                  >
                    <span>&#8209;</span>
                  </TableCellCustom>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TimeTableSelectSlot;

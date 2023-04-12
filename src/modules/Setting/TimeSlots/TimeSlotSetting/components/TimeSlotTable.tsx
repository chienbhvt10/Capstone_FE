import ClearIcon from '@mui/icons-material/Clear';
import { Table } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import TableToolCustom from '~/components/TableComponents/TableToolCustom';
import { DAY_SESSION } from '~/constants';
import {
  createTimeSlotSegment,
  deleteTimeSlot,
  deleteTimeSlotSegment,
  getTimeSlotSegments,
  updateTimeSlot,
  updateTimeSlotSegment,
} from '~/services/timeslot';
import { timeSlotColumns } from '../../utils/columns';
import { daySessionItem, getSlotSelectItem } from '../../utils/data';
import { SegmentByDay, SlotSegment, TimeSlotSegment } from '../../utils/type';
import EditableCell from './EditableCell';
import EditableCellForSegment from './EditableCellForSegment';
import useRefresh from '~/hooks/useRefresh';
import useArrange from '~/hooks/useArrange';

interface Props {
  refresh: any;
  numberSlots: number;
  refetch: React.DispatchWithoutAction;
}

const TimeSlotTable = (props: Props) => {
  const { numberSlots, refetch, refresh } = props;
  const { currentSemester } = useArrange();
  const [timeSlots, setTimeSlots] = useState<TimeSlotSegment[]>([]);

  useEffect(() => {
    if (currentSemester) {
      getTimeSlotSegments({ semesterId: currentSemester?.id || 0 }).then(
        (res) => {
          if (res.data) {
            setTimeSlots(res.data);
          }
        }
      );
    }
  }, [refresh, currentSemester]);

  const onDelete = (timeSlot: TimeSlotSegment) => async () => {
    await deleteTimeSlot(timeSlot.timeSlotId).then((res) => {
      const newTimeSlot = timeSlots.filter(
        (t) => t.timeSlotId !== timeSlot.timeSlotId
      );
      setTimeSlots(newTimeSlot);
    });
  };

  const onDeleteTimeSlotSegment = async (slotSegment?: SlotSegment) => {
    await updateTimeSlotSegment({
      segmentId: slotSegment?.segmentId || 0,
      dayOfWeek: slotSegment?.dayId || 0,
      segment: 0,
      slotId: slotSegment?.slotId || 0,
    }).then((res) => {
      refetch();
    });
  };

  const onEditSlotSegment = async (
    slotSegment?: SlotSegment,
    value?: number
  ) => {
    await updateTimeSlotSegment({
      segmentId: slotSegment?.segmentId || 0,
      dayOfWeek: slotSegment?.dayId || 0,
      segment: value || 0,
      slotId: slotSegment?.slotId || 0,
    }).then((res) => {
      refetch();
    });
  };

  const onEditDaySession = async (
    timeSlot?: TimeSlotSegment,
    slotSegment?: SlotSegment,
    value?: number
  ) => {
    await updateTimeSlot({
      id: timeSlot?.timeSlotId || 0,
      amorPm: value || 0,
      name: timeSlot?.timeSlotName || '',
    }).then((res) => {
      const newTimeSlot = timeSlots.map((timeSlot) => {
        if (timeSlot.timeSlotId === timeSlot.timeSlotId) {
          return {
            ...timeSlot,
            amorPm: value || 0,
          };
        }
        return timeSlot;
      });
      setTimeSlots(newTimeSlot);
    });
  };

  return (
    <TableContainer
      sx={{
        maxWidth: 1200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 2,
        maxHeight: 400,
      }}
    >
      <Table stickyHeader aria-label="sticky table" sx={{ borderSpacing: 2 }}>
        <TableHead>
          <TableRow>
            {timeSlotColumns.map((item) => (
              <TableCellCustom
                key={item.id + 'a'}
                align={item.align}
                minWidth={item.minWidth}
                minHeight={item.minHeight}
                sticky={item.sticky}
                border={true}
              >
                {item.label}
              </TableCellCustom>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {timeSlots.map((timeSlot) => (
            <TableRow
              role="checkbox"
              tabIndex={-1}
              key={timeSlot.timeSlotId + 989789458}
            >
              <TableCellCustom align="center" border={true}>
                {timeSlot.timeSlotName}
              </TableCellCustom>
              <EditableCell
                key={timeSlot.timeSlotId + timeSlot.timeSlotName}
                timeSlotSegment={timeSlot}
                text={DAY_SESSION[timeSlot.amorPm]}
                value={timeSlot.amorPm}
                selectItems={daySessionItem}
                selectTitle="Select Day Session"
                callback={onEditDaySession}
              />

              {timeSlot.segmentByDays?.map((segmentByDay) => (
                <EditableCellForSegment
                  timeSlot={timeSlot}
                  key={Math.random()}
                  segmentByDay={segmentByDay}
                  selectItems={getSlotSelectItem(numberSlots)}
                  selectTitle="Select Segment"
                  updateSegment={onEditSlotSegment}
                  deleteSegment={onDeleteTimeSlotSegment}
                />
              ))}

              <TableCellCustom align="center" border={true}>
                <TableToolCustom
                  item={timeSlot}
                  onDelete={onDelete}
                  displayEditButton={false}
                />
              </TableCellCustom>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TimeSlotTable;

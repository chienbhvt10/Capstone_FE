import { Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import {
  deleteTimeSlotSegment,
  getTimeSlotSegments,
  getTimeSlots,
} from '~/services/timeslot';
import { timeSlotColumns } from '../../utils/columns';
import { TimeSlotSegment } from '../../utils/type';
import TableToolCustom from '~/components/TableComponents/TableToolCustom';
import { DAY_SESSION } from '~/constants';
import useRefresh from '~/hooks/useRefresh';

interface Props {
  refresh: any;
}

const TimeSlotTable = (props: Props) => {
  const { refresh } = props;

  const [timeSlots, setTimeSlots] = useState<TimeSlotSegment[]>([]);

  useEffect(() => {
    getTimeSlotSegments().then((res) => {
      if (res.data) {
        setTimeSlots(res.data);
      }
    });
  }, [refresh]);

  const onDelete = (item: TimeSlotSegment) => async () => {
    await deleteTimeSlotSegment(item.timeSlotId).then((res) => {
      const newTimeSlot = timeSlots.filter(
        (t) => t.timeSlotId !== item.timeSlotId
      );
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
              >
                {item.label}
              </TableCellCustom>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {timeSlots.map((item) => (
            <TableRow
              role="checkbox"
              tabIndex={-1}
              key={item.timeSlotId + 989789458}
            >
              <TableCellCustom align="center" border={true} hover={true}>
                {item.timeSlotName}
              </TableCellCustom>
              {item.slotSegments?.map((slotSegment) => (
                <TableCellCustom
                  key={Math.random() + 1 + slotSegment.segmentId}
                  align="center"
                  border={true}
                  hover={true}
                >
                  {slotSegment.segment !== 0 ? (
                    `Slot ${slotSegment.segment}`
                  ) : (
                    <>&#8209;</>
                  )}
                </TableCellCustom>
              ))}
              <TableCellCustom align="center" border={true} hover={true}>
                {DAY_SESSION[item.amorPm]}
              </TableCellCustom>
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
  );
};

export default TimeSlotTable;

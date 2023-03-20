import { Container } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useEffect, useMemo, useState } from 'react';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import TableCustom from '~/components/TableComponents/TableCustom';
import TableToolCustom from '~/components/TableComponents/TableToolCustom';
import { TimeSlot } from '../../utils/type';
import { getTimeSlots } from '~/services/timeslot';
import { getTimeSlotTableColumns } from '../../utils/columns';

const TimeSlotTable = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    getTimeSlots().then((res) => {
      if (res.data) {
        setTimeSlots(res.data);
      }
    });
  }, []);

  const columns = useMemo(() => getTimeSlotTableColumns(), []);

  return (
    <Container maxWidth="lg">
      <TableContainer sx={{ maxHeight: 400 }}>
        <TableCustom>
          <TableHead>
            <TableRow>
              {columns.map((item) => (
                <TableCellCustom
                  key={item.id}
                  align={item.align}
                  stickyPosition={item.stickyPosition}
                  sticky={item.sticky}
                  minWidth={100}
                >
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {item.label}
                  </Typography>
                </TableCellCustom>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {timeSlots?.length > 0 &&
              timeSlots.map((item) => (
                <TableRow role="checkbox" tabIndex={-1} key={item.id}>
                  <TableCellCustom align="center" border={true} hover={true}>
                    <Typography variant="body1">{item.name}</Typography>
                  </TableCellCustom>
                  <TableCellCustom align="center" border={true} hover={true}>
                    <Typography variant="body1">{item.description}</Typography>
                  </TableCellCustom>
                  <TableCellCustom align="center" border={true} hover={true}>
                    <Typography variant="body1">{item.slot1}</Typography>
                  </TableCellCustom>
                  <TableCellCustom align="center" border={true} hover={true}>
                    <Typography variant="body1">{item.slot2}</Typography>
                  </TableCellCustom>
                  <TableCellCustom align="center" border={true} hover={true}>
                    <TableToolCustom
                      item={item}
                      onEdit={(item: TimeSlot) => () => {}}
                      onDelete={(item: TimeSlot) => () => {}}
                    />
                  </TableCellCustom>
                </TableRow>
              ))}
          </TableBody>
        </TableCustom>
      </TableContainer>
    </Container>
  );
};

export default TimeSlotTable;

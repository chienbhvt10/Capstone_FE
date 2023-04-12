import { Box, CircularProgress, TableCell } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useEffect, useMemo, useState } from 'react';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import TableCustom from '~/components/TableComponents/TableCustom';
import useArrange from '~/hooks/useArrange';
import useNotification from '~/hooks/useNotification';
import {
  getTimeSlotConflicts,
  getTimeSlots,
  updateTimeSlotConflict,
} from '~/services/timeslot';
import wait from '~/utils/wait';
import { getTableSlotConflictColumns } from '../utils/columns';
import { SlotConflictData, SlotConflictInfos, TimeSlot } from '../utils/type';

const TimeSlotConflict = () => {
  const theme = useTheme();
  const { currentSemester } = useArrange();
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const setNotification = useNotification();
  const columns = useMemo(
    () => getTableSlotConflictColumns(timeSlots),
    [timeSlots]
  );

  useEffect(() => {
    if (currentSemester) {
      getTimeSlots({ semesterId: currentSemester?.id || 0 }).then((res) => {
        if (res.data && res.data.length > 0) {
          setTimeSlots(res.data || []);
        }
      });
    }
  }, [currentSemester]);

  const [timeSlotConflict, setTimeSlotConflict] = useState<SlotConflictData[]>(
    []
  );
  const [loadingTable, setLoadingTable] = useState<boolean>(false);

  useEffect(() => {
    setLoadingTable(true);
    getTimeSlotConflicts()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setTimeSlotConflict(res.data);
        }
      })
      .finally(async () => {
        await wait(500);
        setLoadingTable(false);
      });
  }, []);

  const onEdit =
    (
      slotConflictData: SlotConflictData,
      slotConflictInfos: SlotConflictInfos,
      value: boolean
    ) =>
    () => {
      updateTimeSlotConflict({
        conflictId: slotConflictInfos.conflictId,
        conflict: !value,
      })
        .then((res) => {
          const newSlotConflictData = timeSlotConflict.map((item) => {
            if (item.timeSlotId === slotConflictData.timeSlotId) {
              const newSlotConflictInfos = item.slotConflictInfos.map(
                (subItem) => {
                  if (subItem.conflictId === slotConflictInfos.conflictId) {
                    return {
                      ...subItem,
                      conflict: !value,
                    };
                  }
                  return subItem;
                }
              );
              return {
                ...item,
                slotConflictInfos: newSlotConflictInfos,
              };
            }
            return item;
          });
          setTimeSlotConflict(newSlotConflictData);
        })
        .catch((err) =>
          setNotification({
            message: 'Update error',
            severity: 'error',
          })
        );
    };

  return (
    <TableContainer sx={{ maxHeight: 500 }}>
      {loadingTable ? (
        <Box
          sx={{
            minHeight: 450,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableCustom>
          <TableHead>
            <TableRow>
              {columns.map((item) => (
                <TableCell
                  key={item.id}
                  align={item.align}
                  sx={{
                    border: '1px solid #ccc',
                    borderSpacing: '2px',
                    left: item.stickyPosition === 'left' ? 0 : 'unset',
                    right: item.stickyPosition === 'right' ? 0 : 'unset',
                    zIndex: item.zIndex
                      ? item.zIndex
                      : item.sticky
                      ? theme.zIndex.appBar + 10
                      : theme.zIndex.appBar,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      minWidth: item.minWidth,
                      minHeight: item.minHeight,
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {item.label}
                    </Typography>
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {timeSlotConflict.map((item, index) => (
              <TableRow role="checkbox" tabIndex={-1} key={index + 1}>
                <TableCellCustom
                  key={index + 1}
                  align="center"
                  stickyPosition="left"
                  sticky={true}
                  minHeight={25}
                  border={true}
                  hover={true}
                >
                  <Typography variant="body1">{item.timeSlotName}</Typography>
                </TableCellCustom>
                {item.slotConflictInfos.map((slot, index) => (
                  <TableCellCustom
                    key={index + 2}
                    align="center"
                    minHeight={25}
                    border={true}
                    hover={true}
                    onDoubleClick={onEdit(item, slot, slot.conflict)}
                  >
                    <Typography variant="body1" sx={{ lineHeight: 1 }}>
                      {slot.conflict ? 'x' : <>&#8209;</>}
                    </Typography>
                  </TableCellCustom>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </TableCustom>
      )}
    </TableContainer>
  );
};

export default TimeSlotConflict;

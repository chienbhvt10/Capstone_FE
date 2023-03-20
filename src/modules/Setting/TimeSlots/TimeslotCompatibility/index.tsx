import { Box, CircularProgress, TableCell } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useEffect, useMemo, useState } from 'react';
import TableCellSelect from '~/components/OtherComponents/TableCellSelect';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import TableCustom from '~/components/TableComponents/TableCustom';
import useArrange from '~/hooks/useArrange';
import useNotification from '~/hooks/useNotification';
import {
  getTimeSlotCompatibilities,
  updateTimeSlotCompatibility,
} from '~/services/timeslot';
import wait from '~/utils/wait';
import { getTableSlotCompatibilityColumns } from '../utils/columns';
import {
  SlotCompatibilityData,
  SlotCompatibilityInfos,
  SlotConflictSelectItem,
} from '../utils/type';
import { slotConflictItem } from '../utils/data';

const TimeSlotCompatibility = () => {
  const theme = useTheme();
  const { timeSlots } = useArrange();
  const setNotification = useNotification();
  const columns = useMemo(
    () => getTableSlotCompatibilityColumns(timeSlots),
    [timeSlots]
  );
  const [loadingTable, setLoadingTable] = useState<boolean>(false);
  const [timeSlotCompatibility, setTimeSlotCompatibility] =
    useState<SlotCompatibilityData[]>();

  useEffect(() => {
    setLoadingTable(true);
    getTimeSlotCompatibilities()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setTimeSlotCompatibility(res.data);
        }
      })
      .finally(async () => {
        await wait(500);
        setLoadingTable(false);
      });
  }, []);

  const onEdit = (item: SlotCompatibilityInfos, value: number) => {
    updateTimeSlotCompatibility({
      compatibilityId: item.compatibilityId,
      compatibilityLevel: value,
    })
      .then((res) => {
        setNotification({
          message: 'Update success',
          severity: 'success',
        });
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
      <TableCustom>
        <TableHead>
          <TableRow>
            {columns.map((item) => (
              <TableCell
                key={item.id}
                align={item.align}
                sx={{
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
        {loadingTable ? (
          <Box sx={{ minHeight: 450 }}>
            <CircularProgress
              sx={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                display: 'block',
              }}
            />
          </Box>
        ) : (
          <TableBody>
            {timeSlotCompatibility?.length &&
              timeSlotCompatibility.map((item, index) => (
                <TableRow role="checkbox" tabIndex={-1} key={index + 1}>
                  <TableCellCustom
                    key={index + 1}
                    align="center"
                    stickyPosition="left"
                    sticky={true}
                    minHeight={60}
                    border={true}
                    hover={true}
                  >
                    <Typography variant="body1">{item.timeSlotName}</Typography>
                  </TableCellCustom>
                  {item.slotCompatibilityInfos.map((slot, index) => (
                    <TableCellCustom
                      key={index + 2}
                      align="center"
                      minHeight={60}
                      border={true}
                      hover={true}
                    >
                      <TableCellSelect<SlotConflictSelectItem>
                        value={slot.compatibilityLevel}
                        item={slot}
                        selectItems={slotConflictItem}
                        selectTitle="Select conflict level"
                        callback={onEdit}
                      />
                    </TableCellCustom>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        )}
      </TableCustom>
    </TableContainer>
  );
};

export default TimeSlotCompatibility;

import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';
import { getTableSlotCompatibilityColumns } from '../utils/columns';
import { slotCompatibilityData, slotConflictItem } from '../utils/data';
import { SlotConflictSelectItem } from '../utils/type';
import TableCustom from '~/components/TableComponents/TableCustom';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import TableCellSelect from '~/components/OtherComponents/TableCellSelect';
import { useTheme } from '@mui/material/styles';
import { Box, TableCell } from '@mui/material';

const TimeSlotCompatibility = () => {
  const theme = useTheme();
  const columns = useMemo(() => getTableSlotCompatibilityColumns(), []);

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
        <TableBody>
          {slotCompatibilityData.map((item, index) => (
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
                <Typography variant="body1">{item.slot}</Typography>
              </TableCellCustom>
              {item.slots.map((slot, index) => (
                <TableCellCustom
                  key={index + 2}
                  align="center"
                  minHeight={60}
                  border={true}
                  hover={true}
                >
                  <TableCellSelect<SlotConflictSelectItem>
                    value={slot.conflictLevel}
                    item={slot}
                    selectItems={slotConflictItem}
                    selectTitle="Select conflict level"
                  />
                </TableCellCustom>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TableCustom>
    </TableContainer>
  );
};

export default TimeSlotCompatibility;

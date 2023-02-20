import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';
import TableCellCustom from '~/components/Table/TableCellCustom';
import TableCustom from '~/components/Table/TableCustom';
import { getTableSlotCompatibilityColumns } from '../utils/columns';
import { slotCompatibilityData } from '../utils/data';

const TimeSlotCompatibility = () => {
  const columns = useMemo(() => getTableSlotCompatibilityColumns(), []);

  return (
    <TableContainer sx={{ maxHeight: 550 }}>
      <TableCustom>
        <TableHead>
          <TableRow>
            {columns.map((item) => (
              <TableCellCustom
                key={item.id}
                align={item.align}
                stickyPosition={item.stickyPosition}
                sticky={item.sticky}
                minWidth={60}
              >
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {item.label}
                </Typography>
              </TableCellCustom>
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
                  <Select value={slot.conflictLevel}>
                    <MenuItem disabled value="">
                      <em>Select conflict level</em>
                    </MenuItem>
                    <MenuItem value={-5}>-5</MenuItem>
                    <MenuItem value={-4}>-4</MenuItem>
                    <MenuItem value={-3}>-3</MenuItem>
                    <MenuItem value={-2}>-2</MenuItem>
                    <MenuItem value={-1}>-1</MenuItem>
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
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
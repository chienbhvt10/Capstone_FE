import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import { SelectChangeEvent } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import {
  lecturerSlotPreferenceLevel,
  slotPreferenceLevelItems,
} from '../utils/data';
import { getTableSlotColumns } from '../utils/slotColumns';
import { useState } from 'react';
import { useMemo } from 'react';
import TableCustom from '~/components/table/TableCustom';
import TableCellCustom from '~/components/table/TableCellCustom';
import TableCellSelect from '~/components/specificComponent/TableCellSelect';
import { SlotPreferenceLevelItems } from '../utils/types';

const SlotPreferenceLevel = () => {
  const theme = useTheme();
  const [currentSelectValue, setCurrentSelectValue] = useState<string>('');

  const columns = useMemo(() => getTableSlotColumns(), []);

  const onChangeSelect = (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => {
    setCurrentSelectValue(event.target.value);
  };

  return (
    <TableContainer sx={{ maxHeight: 550 }}>
      <TableCustom>
        <TableHead>
          <TableRow>
            {columns.map((item) => (
              <TableCellCustom
                key={item.id}
                align={item.align}
                sticky={item.sticky}
                stickyPosition={item.stickyPosition}
                minWidth={item.minWidth}
                minHeight={item.minHeight}
              >
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {item.label}
                </Typography>
              </TableCellCustom>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {lecturerSlotPreferenceLevel.map((item, index) => (
            <TableRow role="checkbox" tabIndex={-1} key={index + 1}>
              <TableCellCustom
                align="center"
                sticky={true}
                stickyPosition="left"
                minHeight={60}
              >
                <Typography variant="body1">{item.lecturer}</Typography>
              </TableCellCustom>
              {item.slots.map((slot, index) => (
                <TableCellCustom key={index + 2} align="center" minHeight={60}>
                  <TableCellSelect<SlotPreferenceLevelItems>
                    value={slot.preferenceLevel}
                    selectTitle="Select preference level"
                    selectItems={slotPreferenceLevelItems}
                    item={slot}
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

export default SlotPreferenceLevel;

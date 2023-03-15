import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';
import TableCellSelect from '~/components/OtherComponents/TableCellSelect';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import TableCustom from '~/components/TableComponents/TableCustom';
import { getTableAreaSlotWeightColumns } from '../utils/columns';
import { areaSlotWeightData, areaSlotWeightItem } from '../utils/data';
import { AreaSlotWeightSelectItem } from '../utils/type';
import { Box, TableCell } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const AreaSlotWeight = () => {
  const columns = useMemo(() => getTableAreaSlotWeightColumns(), []);
  const theme = useTheme();

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
          {areaSlotWeightData.map((item, index) => (
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
                  <TableCellSelect<AreaSlotWeightSelectItem>
                    value={slot.slotWeight}
                    item={slot}
                    selectItems={areaSlotWeightItem}
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

export default AreaSlotWeight;

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

const AreaSlotWeight = () => {
  const columns = useMemo(() => getTableAreaSlotWeightColumns(), []);

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

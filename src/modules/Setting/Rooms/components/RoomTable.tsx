import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';
import TableCellCustom from '~/components/table/TableCellCustom';
import TableCustom from '~/components/table/TableCustom';
import { getRoomsDistanceColumns } from '../util/columns';
import { roomDistanceData } from '../util/data';
import TableToolCustom from '~/components/table/TableToolCustom';

const RoomTable = () => {
  const columns = useMemo(() => getRoomsDistanceColumns(), []);

  const onEdit = (item: any) => () => {};

  const onDelete = (item: any) => () => {};

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
          {roomDistanceData.map((item, index) => (
            <TableRow role="checkbox" tabIndex={-1} key={index + 1}>
              <TableCellCustom align="center" border={true} hover={true}>
                <Typography variant="body1">{item.building1}</Typography>
              </TableCellCustom>
              <TableCellCustom align="center" border={true} hover={true}>
                <Typography variant="body1">{item.building2}</Typography>
              </TableCellCustom>
              <TableCellCustom align="center" border={true} hover={true}>
                <Typography variant="body1">{item.distance}</Typography>
              </TableCellCustom>
              <TableCellCustom align="center" border={true} hover={true}>
                <TableToolCustom
                  item={item}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </TableCellCustom>
            </TableRow>
          ))}
        </TableBody>
      </TableCustom>
    </TableContainer>
  );
};

export default RoomTable;

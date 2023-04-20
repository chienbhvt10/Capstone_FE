import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import TableCustom from '~/components/TableComponents/TableCustom';
import useArrange from '~/hooks/useArrange';
import { getDistanceColumns } from '../util/columns';
import EditableCell from './EditableCell';
import { Building, BuildingDistanceData } from '../util/type';

interface Props {
  buildings: Building[];
  distances: BuildingDistanceData[];
  refetch: React.DispatchWithoutAction;
}
const DistanceTable = (props: Props) => {
  const { buildings, distances, refetch } = props;

  const columns = useMemo(() => getDistanceColumns(buildings), [buildings]);

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
                border={true}
              >
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {item.label}
                </Typography>
              </TableCellCustom>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {distances.map((item, index) => (
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
                <Typography variant="body2">{item.buildingName}</Typography>
              </TableCellCustom>
              {item.buildingDistances.map((distance) => (
                <EditableCell
                  key={distance.id + item.buildingId}
                  distanceData={item}
                  distanceInfo={distance}
                  refetch={refetch}
                />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TableCustom>
    </TableContainer>
  );
};

export default DistanceTable;

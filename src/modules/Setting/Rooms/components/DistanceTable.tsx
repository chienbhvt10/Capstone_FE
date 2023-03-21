import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useEffect, useMemo, useState } from 'react';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import TableCustom from '~/components/TableComponents/TableCustom';
import useRefresh from '~/hooks/useRefresh';
import { getAllBuilding, getDistances } from '~/services/distance';
import { getDistanceColumns } from '../util/columns';
import { Building, BuildingDistanceData } from '../util/type';
import EditableCell from './EditableCell';

const RoomTable = () => {
  const [allBuilding, setAllBuilding] = useState<Building[]>([]);
  const [distanceData, setDistanceData] = useState<BuildingDistanceData[]>([]);
  const [refresh, refetch] = useRefresh();

  const columns = useMemo(() => getDistanceColumns(allBuilding), [allBuilding]);

  useEffect(() => {
    getAllBuilding().then((res) => {
      if (res.data && res.data.length > 0) {
        setAllBuilding(res.data);
      }
    });
  }, []);

  useEffect(() => {
    getDistances().then((res) => {
      if (res.data && res.data.length > 0) {
        setDistanceData(res.data);
      }
    });
  }, [refresh]);

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
          {distanceData.map((item, index) => (
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
                <Typography variant="body1">{item.buildingName}</Typography>
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

export default RoomTable;

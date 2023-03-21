import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useEffect, useMemo, useState } from 'react';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import TableCustom from '~/components/TableComponents/TableCustom';
import { getBuildingColumns } from '../util/columns';
import TableToolCustom from '~/components/TableComponents/TableToolCustom';
import { Building } from '../util/type';
import { getAllBuilding } from '~/services/distance';
import useRefresh from '~/hooks/useRefresh';

interface Props {}

const BuildingTable = (props: Props) => {
  const columns = useMemo(() => getBuildingColumns(), []);
  const [buildingData, setBuildingData] = useState<Building[]>([]);
  const [refresh, refetch] = useRefresh();

  useEffect(() => {
    getAllBuilding().then((res) => {
      if (res.data && res.data.length > 0) {
        setBuildingData(res.data);
      }
    });
  }, [refresh]);

  const onEdit = (item: Building) => () => {
    refetch();
  };

  const onDelete = (item: Building) => () => {
    refetch();
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
          {buildingData.map((item, index) => (
            <TableRow role="checkbox" tabIndex={-1} key={index + 1}>
              <TableCellCustom align="center" border={true} hover={true}>
                <Typography variant="body1">{item.name}</Typography>
              </TableCellCustom>
              <TableCellCustom align="center" border={true} hover={true}>
                <Typography variant="body1">{item.shortName}</Typography>
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

export default BuildingTable;

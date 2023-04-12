import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import TableCustom from '~/components/TableComponents/TableCustom';
import TableToolCustom from '~/components/TableComponents/TableToolCustom';
import useArrange from '~/hooks/useArrange';
import { deleteBuilding } from '~/services/distance';
import { getBuildingColumns } from '../util/columns';
import { Building } from '../util/type';

interface Props {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingItem: React.Dispatch<React.SetStateAction<Building | null>>;
}

const BuildingTable = (props: Props) => {
  const { setEditMode, setEditingItem } = props;

  const columns = useMemo(() => getBuildingColumns(), []);
  const { buildings, refetchBuilding } = useArrange();

  const onEdit = (item: Building) => () => {
    setEditMode(true);
    setEditingItem(item);
  };

  const onDelete = (item: Building) => async () => {
    await deleteBuilding(item.id).then((res) => refetchBuilding());
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
          {buildings?.length > 0 &&
            buildings.map((item, index) => (
              <TableRow role="checkbox" tabIndex={-1} key={Math.random()}>
                <TableCellCustom align="center" border={true} hover={true}>
                  <Typography variant="body2">{index}</Typography>
                </TableCellCustom>
                <TableCellCustom align="center" border={true} hover={true}>
                  <Typography variant="body2">{item.name}</Typography>
                </TableCellCustom>
                <TableCellCustom align="center" border={true} hover={true}>
                  <Typography variant="body2">{item.shortName}</Typography>
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

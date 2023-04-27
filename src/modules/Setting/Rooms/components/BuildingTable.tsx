import { Button, Stack } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete/Autocomplete';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField/TextField';
import Typography from '@mui/material/Typography';
import { Fragment, SyntheticEvent, useMemo, useState } from 'react';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import TableCustom from '~/components/TableComponents/TableCustom';
import TableToolCustom from '~/components/TableComponents/TableToolCustom';
import useArrange from '~/hooks/useArrange';
import { deleteBuilding, reuseBuilding } from '~/services/distance';
import { getBuildingColumns } from '../util/columns';
import { Building } from '../util/type';
import useNotification from '~/hooks/useNotification';
import { Semester } from '~/modules/Semester/util/type';
import useAuth from '~/hooks/useAuth';
interface Props {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingItem: React.Dispatch<React.SetStateAction<Building | null>>;
  refetch: React.DispatchWithoutAction;
  buildings: Building[];
  reUseForCurrentSemester: () => void;
  onChangeSemestersSelector: (
    event: SyntheticEvent,
    newValue: Semester | null
  ) => void;
  semestersSelector: Semester | null;
}

const BuildingTable = (props: Props) => {
  const {
    setEditMode,
    setEditingItem,
    refetch,
    buildings,
    reUseForCurrentSemester,
    onChangeSemestersSelector,
    semestersSelector,
  } = props;
  const columns = useMemo(() => getBuildingColumns(), []);
  const { currentSemester, semesters } = useArrange();

  const onEdit = (item: Building) => () => {
    setEditMode(true);
    setEditingItem(item);
  };

  const onDelete = (item: Building) => async () => {
    await deleteBuilding(item.id).then((res) => refetch());
  };

  return (
    <Stack direction="column" spacing={2} sx={{ width: 1 }}>
      <Stack direction="row" spacing={2}>
        <Autocomplete
          sx={{ width: 1, maxWidth: 250 }}
          size="small"
          filterSelectedOptions
          getOptionLabel={(option) => `${option.semester} ${option.year}`}
          isOptionEqualToValue={(option, value) => {
            return option.id === value.id;
          }}
          options={semesters}
          value={semestersSelector}
          onChange={onChangeSemestersSelector}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Select Semester" />
          )}
        />
        {semestersSelector?.id !== currentSemester?.id &&
          buildings?.length > 0 && (
            <Button onClick={reUseForCurrentSemester}>
              Reuse for current semester
            </Button>
          )}
      </Stack>
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
                    <Typography variant="body2">{index + 1}</Typography>
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
    </Stack>
  );
};

export default BuildingTable;

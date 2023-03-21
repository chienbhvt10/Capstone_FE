import ClickAwayListener from '@mui/base/ClickAwayListener';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { ChangeEvent, KeyboardEvent, useState, useCallback } from 'react';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import useNotification from '~/hooks/useNotification';
import { BuildingDistanceData, BuildingDistanceInfos } from '../util/type';
import { updateDistance } from '~/services/distance';

interface Props {
  distanceInfo: BuildingDistanceInfos;
  distanceData: BuildingDistanceData;
  refetch: React.DispatchWithoutAction;
}

const EditableCell = (props: Props) => {
  const { distanceData, distanceInfo, refetch } = props;
  const [editingDistance, setEditingDistance] = useState<number>(0);
  const [editMode, setEditMode] = useState<boolean>(false);
  const setNotification = useNotification();

  const onEditMode = (
    item: BuildingDistanceData,
    distance: BuildingDistanceInfos
  ) => {
    if (item.buildingId !== distance.buildingDistanceId) {
      setEditMode(true);
      setEditingDistance(distance.distanceBetween);
    } else {
      setNotification({
        message:
          'Cannot edit the distance from a building to itself, it always 0',
        severity: 'error',
      });
    }
  };

  const onChangeDistanceBetween = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (Number.isInteger(parseInt(event.target.value))) {
      setEditingDistance(parseInt(event.target.value));
    }
    if (event.target.value === '') setEditingDistance(0);
  };

  const handleClickAway = () => {
    if (editMode) {
      setEditMode(false);
      updateDistance({
        distanceBetween: editingDistance,
        distanceId: distanceInfo.id,
      }).then((res) => {
        refetch();
      });
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setEditMode(false);
      updateDistance({
        distanceBetween: editingDistance,
        distanceId: distanceInfo.id,
      }).then((res) => {
        refetch();
      });
    }
  };

  return (
    <TableCellCustom
      align="center"
      minHeight={60}
      border={true}
      hover={true}
      onDoubleClick={(event) =>
        !editMode && onEditMode(distanceData, distanceInfo)
      }
    >
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box onClick={(event) => event.stopPropagation()}>
          {editMode ? (
            <TextField
              value={editingDistance}
              onChange={onChangeDistanceBetween}
              onKeyDown={onKeyDown}
              inputProps={{ style: { textAlign: 'center' } }}
              sx={{ maxWidth: '80%' }}
            />
          ) : (
            distanceInfo.distanceBetween
          )}
        </Box>
      </ClickAwayListener>
    </TableCellCustom>
  );
};

export default EditableCell;

import ClickAwayListener from '@mui/base/ClickAwayListener';
import Box from '@mui/material/Box';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import useNotification from '~/hooks/useNotification';
import {
  DaySessionSelectItem,
  SlotSegment,
  TimeSlotSegment,
} from '../../utils/type';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material';

interface Props {
  timeSlotSegment: TimeSlotSegment;
  slotSegment?: SlotSegment;
  value: number;
  text: string | React.ReactNode;
  selectItems: DaySessionSelectItem[];
  selectTitle: string;
  callback: (
    timeSlotSegment: TimeSlotSegment,
    slotSegment?: SlotSegment,
    value?: number
  ) => void;
}

const EditableCell = (props: Props) => {
  const {
    slotSegment,
    timeSlotSegment,
    text,
    callback,
    value,
    selectItems,
    selectTitle,
  } = props;
  const [selectValue, setSelectValue] = useState(value);
  const [editMode, setEditMode] = useState<boolean>(false);

  const onEditMode = () => {
    setEditMode(true);
  };

  const onChangeSelect = (
    event: SelectChangeEvent<any>,
    child: React.ReactNode
  ) => {
    event.stopPropagation();
    setSelectValue(event.target.value);
    callback && callback(timeSlotSegment, slotSegment, value);
  };

  const handleClickAway = () => {
    if (editMode) {
      setEditMode(false);
      callback && callback(timeSlotSegment, slotSegment, value);
    }
  };

  return (
    <TableCellCustom
      align="center"
      border={true}
      hover={true}
      sx={{
        p: 0,
        border: '1px solid #ccc',
        position: 'relative',
        cursor: 'pointer',
      }}
      onDoubleClick={(event) => !editMode && onEditMode()}
    >
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box onClick={(event) => event.stopPropagation()} sx={{ width: 0.95 }}>
          {editMode ? (
            <Select value={selectValue} onChange={onChangeSelect}>
              <MenuItem disabled value="">
                <em>{selectTitle}</em>
              </MenuItem>
              {selectItems.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          ) : (
            text
          )}
        </Box>
      </ClickAwayListener>
    </TableCellCustom>
  );
};

export default EditableCell;

import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, type SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Fragment, useState } from 'react';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import {
  DaySessionSelectItem,
  SlotSegment,
  TimeSlotSegment,
} from '../../utils/type';

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
    callback && callback(timeSlotSegment, slotSegment, event.target.value);
    if (editMode) {
      setEditMode(false);
    }
  };

  const stopEditMode = () => {
    setEditMode(false);
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
      <Box sx={{ width: 0.95 }}>
        {editMode ? (
          <Fragment>
            <Select
              value={selectValue}
              onChange={onChangeSelect}
              sx={{ width: 0.7 }}
            >
              <MenuItem disabled value="">
                <em>{selectTitle}</em>
              </MenuItem>
              {selectItems.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
            <IconButton
              onClick={stopEditMode}
              sx={{
                p: 0,
                position: 'absolute',
                top: 0,
                right: -2,
              }}
            >
              <ClearIcon
                fontSize="small"
                sx={{
                  color: 'error.main',
                }}
              />
            </IconButton>
          </Fragment>
        ) : (
          text
        )}
      </Box>
    </TableCellCustom>
  );
};

export default EditableCell;

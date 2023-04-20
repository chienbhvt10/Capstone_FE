import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, type SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { Fragment, useState } from 'react';
import {
  DaySessionSelectItem,
  SegmentByDay,
  SlotSegment,
  TimeSlotSegment,
} from '../../utils/type';

interface Props {
  timeSlot: TimeSlotSegment;
  value: number;
  selectItems: DaySessionSelectItem[];
  segmentByDay: SegmentByDay;
  slotSegment: SlotSegment;
  selectTitle: string;
  updateSegment: (slotSegment?: SlotSegment, value?: number) => void;
  deleteSegment: (slotSegment?: SlotSegment) => void;
}

const SelectSegment = (props: Props) => {
  const {
    value,
    updateSegment,
    selectItems,
    selectTitle,
    slotSegment,
    deleteSegment,
    timeSlot,
    segmentByDay,
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
    updateSegment && updateSegment(slotSegment, event.target.value);
    if (editMode) {
      setEditMode(false);
    }
  };

  const stopEditMode = () => {
    setEditMode(false);
  };

  const onDeleteSegment = (slotSegment?: SlotSegment) => () => {
    deleteSegment(slotSegment);
  };

  return (
    <Box
      sx={{ position: 'relative' }}
      onDoubleClick={(event) =>
        !editMode && slotSegment?.segment === 0 && onEditMode()
      }
    >
      {editMode ? (
        <Fragment>
          <Select
            value={selectValue}
            onChange={onChangeSelect}
            sx={{ width: 0.9 }}
            inputProps={{ sx: { py: 0.5 } }}
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
              top: -10,
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
      ) : slotSegment?.segment !== 0 ? (
        <Fragment>
          <Typography
            variant="body2"
            onDoubleClick={(event) => !editMode && onEditMode()}
          >
            Slot {slotSegment?.segment}
          </Typography>
          <IconButton
            onClick={onDeleteSegment(slotSegment)}
            sx={{
              position: 'absolute',
              top: -7,
              right: 0,
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
        '-'
      )}
    </Box>
  );
};

export default SelectSegment;

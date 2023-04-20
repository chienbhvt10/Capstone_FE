import Stack from '@mui/material/Stack';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import {
  DaySessionSelectItem,
  SegmentByDay,
  SlotSegment,
  TimeSlotSegment,
} from '../../utils/type';
import SelectSegment from './SelectSegment';

interface Props {
  timeSlot: TimeSlotSegment;
  segmentByDay: SegmentByDay;
  selectItems: DaySessionSelectItem[];
  selectTitle: string;
  updateSegment: (slotSegment?: SlotSegment, value?: number) => void;
  deleteSegment: (slotSegment?: SlotSegment) => void;
}

const EditableCellForSegment = (props: Props) => {
  const {
    timeSlot,
    segmentByDay,
    updateSegment,
    selectItems,
    selectTitle,
    deleteSegment,
  } = props;

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
    >
      <Stack direction="column" spacing={1} sx={{ width: 1, my: 1 }}>
        {segmentByDay.slotSegments.length > 1 ? (
          segmentByDay.slotSegments.map((slotSegment) => (
            <SelectSegment
              timeSlot={timeSlot}
              key={Math.random()}
              slotSegment={slotSegment}
              segmentByDay={segmentByDay}
              deleteSegment={deleteSegment}
              updateSegment={updateSegment}
              selectItems={selectItems}
              selectTitle={selectTitle}
              value={slotSegment.segment}
            />
          ))
        ) : (
          <SelectSegment
            timeSlot={timeSlot}
            key={Math.random()}
            slotSegment={segmentByDay.slotSegments[0]}
            segmentByDay={segmentByDay}
            deleteSegment={deleteSegment}
            updateSegment={updateSegment}
            selectItems={selectItems}
            selectTitle={selectTitle}
            value={segmentByDay.slotSegments[0].segment}
          />
        )}
      </Stack>
    </TableCellCustom>
  );
};

export default EditableCellForSegment;

import ClearIcon from '@mui/icons-material/Clear';
import { Table } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import TableToolCustom from '~/components/TableComponents/TableToolCustom';
import { DAY_SESSION } from '~/constants';
import {
  createTimeSlotSegment,
  deleteTimeSlot,
  deleteTimeSlotSegment,
  getTimeSlotSegments,
  updateTimeSlot,
  updateTimeSlotSegment,
} from '~/services/timeslot';
import { timeSlotColumns } from '../../utils/columns';
import { daySessionItem, getSlotSelectItem } from '../../utils/data';
import { SlotSegment, TimeSlotSegment } from '../../utils/type';
import EditableCell from './EditableCell';

interface Props {
  refresh: any;
  numberSlots: number;
}

const TimeSlotTable = (props: Props) => {
  const { refresh, numberSlots } = props;

  const [timeSlots, setTimeSlots] = useState<TimeSlotSegment[]>([]);

  useEffect(() => {
    getTimeSlotSegments().then((res) => {
      if (res.data) {
        setTimeSlots(res.data);
      }
    });
  }, [refresh]);

  const onDelete = (item: TimeSlotSegment) => async () => {
    await deleteTimeSlot(item.timeSlotId).then((res) => {
      const newTimeSlot = timeSlots.filter(
        (t) => t.timeSlotId !== item.timeSlotId
      );
      setTimeSlots(newTimeSlot);
    });
  };

  const onDeleteTimeSlotSegment =
    (timeSlot: TimeSlotSegment, slotSegment: SlotSegment) => async () => {
      await deleteTimeSlotSegment(slotSegment.segmentId).then((res) => {
        const newTimeSlot = timeSlots.map((ts) => {
          if (ts.timeSlotId === timeSlot.timeSlotId) {
            const newSegments = ts.slotSegments.map((s) => {
              if (s.segmentId === slotSegment.segmentId) {
                return { ...s, segment: 0 };
              }
              return s;
            });
            return { ...ts, slotSegments: newSegments };
          }
          return ts;
        });
        setTimeSlots(newTimeSlot);
      });
    };

  const onEditSlotSegment = async (
    item: TimeSlotSegment,
    slotSegment?: SlotSegment,
    value?: number
  ) => {
    if (slotSegment?.segmentId !== 0) {
      await updateTimeSlotSegment({
        segmentId: slotSegment?.segmentId || 0,
        dayOfWeek: slotSegment?.dayId || 0,
        segment: value || 0,
        slotId: slotSegment?.slotId || 0,
      }).then((res) => {
        const newTimeSlot = timeSlots.map((timeSlot) => {
          if (timeSlot.timeSlotId === item.timeSlotId) {
            const newSlotSegment = timeSlot.slotSegments.map((ss) => {
              if (ss.dayId === slotSegment?.dayId) {
                return {
                  ...ss,
                  segment: value || 0,
                };
              }
              return ss;
            });
            return {
              ...timeSlot,
              slotSegments: newSlotSegment,
            };
          }
          return timeSlot;
        });
        setTimeSlots(newTimeSlot);
      });
      return;
    }
    // await createTimeSlotSegment({
    //   dayOfWeek: slotSegment?.dayId || 0,
    //   segment: value || 0,
    //   slotId: item?.timeSlotId || 0,
    // }).then((res) => {
    //   if (res.data) {
    //     const newTimeSlot = timeSlots.map((timeSlot) => {
    //       if (timeSlot.timeSlotId === item.timeSlotId) {
    //         const newSlotSegment = timeSlot.slotSegments.map((ss) => {
    //           if (ss.dayId === slotSegment.dayId) {
    //             return {
    //               ...ss,
    //               segmentId: res.data?.segmentId || 0,
    //               segment: value || 0,
    //             };
    //           }
    //           return ss;
    //         });
    //         return {
    //           ...timeSlot,
    //           slotSegments: newSlotSegment,
    //         };
    //       }
    //       return timeSlot;
    //     });
    //     setTimeSlots(newTimeSlot);
    //   }
    // });
  };

  const onEditDaySession = async (
    item: TimeSlotSegment,
    slotSegment?: SlotSegment,
    value?: number
  ) => {
    await updateTimeSlot({
      id: item.timeSlotId || 0,
      amorPm: value || 0,
      name: item.timeSlotName || '',
    }).then((res) => {
      const newTimeSlot = timeSlots.map((timeSlot) => {
        if (timeSlot.timeSlotId === item.timeSlotId) {
          return {
            ...timeSlot,
            amorPm: value || 0,
          };
        }
        return timeSlot;
      });
      setTimeSlots(newTimeSlot);
    });
  };

  return (
    <TableContainer
      sx={{
        maxWidth: 1200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 2,
        maxHeight: 400,
      }}
    >
      <Table stickyHeader aria-label="sticky table" sx={{ borderSpacing: 2 }}>
        <TableHead>
          <TableRow>
            {timeSlotColumns.map((item) => (
              <TableCellCustom
                key={item.id + 'a'}
                align={item.align}
                minWidth={item.minWidth}
                minHeight={item.minHeight}
                sticky={item.sticky}
              >
                {item.label}
              </TableCellCustom>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {timeSlots.map((timeSlot) => (
            <TableRow
              role="checkbox"
              tabIndex={-1}
              key={timeSlot.timeSlotId + 989789458}
            >
              <TableCellCustom align="center" border={true}>
                {timeSlot.timeSlotName}
              </TableCellCustom>
              <EditableCell
                key={timeSlot.timeSlotId + timeSlot.timeSlotName}
                timeSlotSegment={timeSlot}
                text={DAY_SESSION[timeSlot.amorPm]}
                value={timeSlot.amorPm}
                selectItems={daySessionItem}
                selectTitle="Select Day Session"
                callback={onEditDaySession}
              />
              {timeSlot.slotSegments?.map((slotSegment) => (
                <EditableCell
                  key={Math.random() + 1 + slotSegment.segmentId}
                  timeSlotSegment={timeSlot}
                  slotSegment={slotSegment}
                  text={
                    slotSegment.segment !== 0 ? (
                      <Typography variant="body2">
                        Slot {slotSegment.segment}
                        <IconButton
                          onClick={onDeleteTimeSlotSegment(
                            timeSlot,
                            slotSegment
                          )}
                          sx={{
                            position: 'absolute',
                            top: 0,
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
                      </Typography>
                    ) : (
                      ''
                    )
                  }
                  value={slotSegment.segment}
                  selectItems={getSlotSelectItem(numberSlots)}
                  selectTitle="Select Segment"
                  callback={onEditSlotSegment}
                />
              ))}

              <TableCellCustom align="center" border={true}>
                <TableToolCustom
                  item={timeSlot}
                  onDelete={onDelete}
                  displayEditButton={false}
                />
              </TableCellCustom>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TimeSlotTable;

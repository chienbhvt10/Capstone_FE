import { Box, CircularProgress, TableCell } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useEffect, useMemo, useState } from 'react';
import TableCellSelect from '~/components/OtherComponents/TableCellSelect';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import TableCustom from '~/components/TableComponents/TableCustom';
import useArrange from '~/hooks/useArrange';
import useNotification from '~/hooks/useNotification';
import {
  getAreaSlotWeights,
  getTimeSlots,
  updateAreaSlotWeight,
} from '~/services/timeslot';
import wait from '~/utils/wait';
import { getTableAreaSlotWeightColumns } from '../utils/columns';
import {
  AreaSlotWeightData,
  AreaSlotWeightInfos,
  AreaSlotWeightSelectItem,
  TimeSlot,
} from '../utils/type';
import { areaSlotWeightItem } from '../utils/data';

const AreaSlotWeight = () => {
  const theme = useTheme();
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  const columns = useMemo(
    () => getTableAreaSlotWeightColumns(timeSlots),
    [timeSlots]
  );

  useEffect(() => {
    getTimeSlots().then((res) => {
      if (res.data && res.data.length > 0) {
        setTimeSlots(res.data || []);
      }
    });
  }, []);

  const setNotification = useNotification();
  const [loadingTable, setLoadingTable] = useState<boolean>(false);
  const [areaSlotWeight, setAreaSlotWeight] = useState<AreaSlotWeightData[]>();

  useEffect(() => {
    setLoadingTable(true);
    getAreaSlotWeights()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setAreaSlotWeight(res.data);
        }
      })
      .finally(async () => {
        await wait(500);
        setLoadingTable(false);
      });
  }, []);

  const onEdit = (item: AreaSlotWeightInfos, value: number) => {
    updateAreaSlotWeight({
      slotWeightId: item.slotWeightId,
      slotWeight: value,
    })
      .then((res) => {
        if (res.isSuccess) {
          const newAreaSlotWeight = areaSlotWeight?.map((a) => ({
            ...a,
            areaSlotWeightInfos: a.areaSlotWeightInfos.map((i) => {
              if (i.slotWeightId === item.slotWeightId) {
                return {
                  ...i,
                  slotWeight: value,
                };
              }
              return i;
            }),
          }));
          setAreaSlotWeight(newAreaSlotWeight);
        }
      })
      .catch((err) =>
        setNotification({
          message: 'Update error',
          severity: 'error',
        })
      );
  };

  return (
    <TableContainer sx={{ maxHeight: 500 }}>
      {loadingTable ? (
        <Box
          sx={{
            minHeight: 450,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableCustom>
          <TableHead>
            <TableRow>
              {columns.map((item) => (
                <TableCell
                  key={item.id}
                  align={item.align}
                  sx={{
                    left: item.stickyPosition === 'left' ? 0 : 'unset',
                    right: item.stickyPosition === 'right' ? 0 : 'unset',
                    zIndex: item.zIndex
                      ? item.zIndex
                      : item.sticky
                      ? theme.zIndex.appBar + 10
                      : theme.zIndex.appBar,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      minWidth: item.minWidth,
                      minHeight: item.minHeight,
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {item.label}
                    </Typography>
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {areaSlotWeight?.length &&
              areaSlotWeight.map((item, index) => (
                <TableRow role="checkbox" tabIndex={-1} key={index + 1}>
                  <TableCellCustom
                    key={index + 1}
                    align="center"
                    stickyPosition="left"
                    sticky={true}
                    minHeight={40}
                    border={true}
                    hover={true}
                  >
                    <Typography variant="body1">{item.timeSlotName}</Typography>
                  </TableCellCustom>
                  {item.areaSlotWeightInfos.map((slot, index) => (
                    <TableCellCustom
                      key={index + 2}
                      align="center"
                      minHeight={40}
                      border={true}
                      hover={true}
                    >
                      <TableCellSelect<AreaSlotWeightSelectItem>
                        value={slot.slotWeight}
                        item={slot}
                        selectItems={areaSlotWeightItem}
                        selectTitle="Select area slot weight"
                        callback={onEdit}
                      />
                    </TableCellCustom>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </TableCustom>
      )}
    </TableContainer>
  );
};

export default AreaSlotWeight;

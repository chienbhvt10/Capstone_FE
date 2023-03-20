import { Box, CircularProgress, SelectChangeEvent } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useEffect, useMemo, useState } from 'react';
import TableCellSelect from '~/components/OtherComponents/TableCellSelect';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import TableCustom from '~/components/TableComponents/TableCustom';
import useArrange from '~/hooks/useArrange';
import {
  getSlotPreferenceLevels,
  updateSlotPreferenceLevel,
} from '~/services/preferenceLevel';
import wait from '~/utils/wait';
import { slotPreferenceLevelItems } from '../utils/data';
import { getTableSlotColumns } from '../utils/slotColumns';
import {
  LecturerSlotsPreferenceInfo,
  LecturerSlotsPreferenceLevel,
  SlotPreferenceLevelItems,
} from '../utils/types';
import useNotification from '~/hooks/useNotification';

const SlotPreferenceLevel = () => {
  const { timeSlots } = useArrange();
  const setNotification = useNotification();
  const columns = useMemo(() => getTableSlotColumns(timeSlots), [timeSlots]);
  const [loadingTable, setLoadingTable] = useState<boolean>(false);
  const [slotPreferenceLevels, setSlotPreferenceLevels] = useState<
    LecturerSlotsPreferenceLevel[]
  >([]);

  useEffect(() => {
    setLoadingTable(true);
    getSlotPreferenceLevels()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setSlotPreferenceLevels(res.data);
        }
      })
      .finally(async () => {
        await wait(500);
        setLoadingTable(false);
      });
  }, []);

  const onEdit = (item: LecturerSlotsPreferenceInfo, value: number) => {
    updateSlotPreferenceLevel({
      preferenceId: item.preferenceId,
      preferenceLevel: value,
    })
      .then((res) =>
        setNotification({
          message: 'Update success',
          severity: 'success',
        })
      )
      .catch((err) =>
        setNotification({
          message: 'Update error',
          severity: 'error',
        })
      );
  };

  return (
    <TableContainer sx={{ maxHeight: 550, position: 'relative' }}>
      {loadingTable ? (
        <Box sx={{ minHeight: 450 }}>
          <CircularProgress
            sx={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              display: 'block',
            }}
          />
        </Box>
      ) : (
        <TableCustom>
          <TableHead>
            <TableRow>
              {columns.map((item) => (
                <TableCellCustom
                  key={item.id}
                  align={item.align}
                  sticky={item.sticky}
                  stickyPosition={item.stickyPosition}
                  minWidth={item.minWidth}
                  minHeight={item.minHeight}
                >
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {item.label}
                  </Typography>
                </TableCellCustom>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {slotPreferenceLevels.length > 0 &&
              slotPreferenceLevels.map((item, index) => (
                <TableRow role="checkbox" tabIndex={-1} key={index + 1}>
                  <TableCellCustom
                    align="center"
                    sticky={true}
                    stickyPosition="left"
                    minHeight={60}
                  >
                    <Typography variant="body1">{item.lecturerName}</Typography>
                  </TableCellCustom>
                  {item.preferenceInfos.length > 0 &&
                    item.preferenceInfos.map((slot, index) => (
                      <TableCellCustom
                        key={index + 2}
                        align="center"
                        minHeight={60}
                      >
                        <TableCellSelect<SlotPreferenceLevelItems>
                          value={slot.preferenceLevel}
                          selectTitle="Select preference level"
                          selectItems={slotPreferenceLevelItems}
                          item={slot}
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

export default SlotPreferenceLevel;

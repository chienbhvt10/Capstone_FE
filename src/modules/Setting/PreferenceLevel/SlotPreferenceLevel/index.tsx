import { Box, CircularProgress } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete/Autocomplete';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Stack } from '@mui/system';
import { Fragment, useEffect, useMemo, useState, SyntheticEvent } from 'react';
import TableCellSelect from '~/components/OtherComponents/TableCellSelect';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import TableCustom from '~/components/TableComponents/TableCustom';
import useArrange from '~/hooks/useArrange';
import useNotification from '~/hooks/useNotification';
import useRefresh from '~/hooks/useRefresh';
import { Semester } from '~/modules/Semester/util/type';
import {
  getSlotPreferenceLevels,
  updateSlotPreferenceLevel,
} from '~/services/preferenceLevel';
import { getTimeSlots } from '~/services/timeslot';
import wait from '~/utils/wait';
import { TimeSlot } from '../../TimeSlots/utils/type';
import { slotPreferenceLevelItems } from '../utils/data';
import { getTableSlotColumns } from '../utils/slotColumns';
import {
  LecturerSlotsPreferenceInfo,
  LecturerSlotsPreferenceLevel,
  SlotPreferenceLevelItems,
} from '../utils/types';

const SlotPreferenceLevel = () => {
  const theme = useTheme();
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const setNotification = useNotification();
  const columns = useMemo(() => getTableSlotColumns(timeSlots), [timeSlots]);
  const [loadingTable, setLoadingTable] = useState<boolean>(false);
  const [slotPreferenceLevels, setSlotPreferenceLevels] = useState<
    LecturerSlotsPreferenceLevel[]
  >([]);
  const [refresh, refetch] = useRefresh();
  const { semesters, currentSemester } = useArrange();

  const [semestersSelector, setSemestersSelector] = useState<Semester | null>(
    null
  );

  useEffect(() => {
    if (currentSemester) {
      getTimeSlots({ semesterId: currentSemester?.id || 0 }).then((res) => {
        if (res.data && res.data.length > 0) {
          setTimeSlots(res.data || []);
        }
      });
    }
  }, [currentSemester]);

  useEffect(() => {
    if (semestersSelector) {
      setLoadingTable(true);
      getTimeSlots({ semesterId: semestersSelector?.id || 0 }).then((res) => {
        if (res.data && res.data.length > 0) {
          setTimeSlots(res.data || []);
        }
      });
      getSlotPreferenceLevels({ semesterId: semestersSelector?.id || 0 })
        .then((res) => {
          setSlotPreferenceLevels(res.data || []);
        })
        .finally(async () => {
          await wait(500);
          setLoadingTable(false);
        });
    }
  }, [semestersSelector, refresh]);

  const onChangeSemestersSelector = (
    event: SyntheticEvent,
    newValue: Semester | null
  ) => {
    setSemestersSelector(newValue);
    refetch();
  };

  const onEdit = (item: LecturerSlotsPreferenceInfo, value: number) => {
    updateSlotPreferenceLevel({
      preferenceId: item.preferenceId,
      preferenceLevel: value,
    }).catch((err) =>
      setNotification({
        message: 'Update error',
        severity: 'error',
      })
    );
  };

  return (
    <Fragment>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Autocomplete
          sx={{ width: 1, maxWidth: 300 }}
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
        {semestersSelector?.id !== currentSemester?.id && (
          <Button>Reuse for current semester</Button>
        )}
      </Stack>

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
          <Fragment>
            {(slotPreferenceLevels.length === 0 || timeSlots.length === 0) && (
              <Typography variant="body2" sx={{ color: 'error.main' }}>
                Please insert more information
              </Typography>
            )}
            <TableCustom>
              <TableHead>
                <TableRow>
                  {columns.map((item) => (
                    <TableCell
                      key={item.id}
                      align={item.align}
                      sx={{
                        border: '1px solid #ccc',
                        borderSpacing: '2px',
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
                {slotPreferenceLevels.length > 0 &&
                  slotPreferenceLevels.map((item, index) => (
                    <TableRow role="checkbox" tabIndex={-1} key={index + 1}>
                      <TableCellCustom
                        align="center"
                        sticky={true}
                        stickyPosition="left"
                        minHeight={60}
                        border={true}
                      >
                        <Typography variant="body1">
                          {item.lecturerName}
                        </Typography>
                      </TableCellCustom>
                      {item.preferenceInfos.length > 0 &&
                        item.preferenceInfos.map((slot, index) => (
                          <TableCellCustom
                            key={index + 2}
                            align="center"
                            minHeight={60}
                            border={true}
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
          </Fragment>
        )}
      </TableContainer>
    </Fragment>
  );
};

export default SlotPreferenceLevel;

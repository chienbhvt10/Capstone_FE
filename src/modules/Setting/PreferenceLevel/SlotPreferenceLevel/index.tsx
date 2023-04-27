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
import {
  Fragment,
  useEffect,
  useMemo,
  useState,
  SyntheticEvent,
  useLayoutEffect,
} from 'react';
import TableCellSelect from '~/components/OtherComponents/TableCellSelect';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import TableCustom from '~/components/TableComponents/TableCustom';
import useArrange from '~/hooks/useArrange';
import useNotification from '~/hooks/useNotification';
import useRefresh from '~/hooks/useRefresh';
import { Semester } from '~/modules/Semester/util/type';
import {
  createDefaultSlotPreferenceLevels,
  getSlotPreferenceLevels,
  reuseSlotPreference,
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
import useAuth from '~/hooks/useAuth';
import TablePagination from '~/components/TableComponents/TablePagination';
import useFilterSlotPreference from '~/hooks/filter/useFilterSlotPreference';

const SlotPreferenceLevel = () => {
  const theme = useTheme();
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const { semesters, currentSemester } = useArrange();
  const { user } = useAuth();
  const columns = useMemo(() => getTableSlotColumns(timeSlots), [timeSlots]);
  const setNotifications = useNotification();
  const [loadingTable, setLoadingTable] = useState<boolean>(false);
  const [slotPreferenceLevels, setSlotPreferenceLevels] = useState<
    LecturerSlotsPreferenceLevel[]
  >([]);
  const [refresh, refetch] = useRefresh();
  const [semestersSelector, setSemestersSelector] = useState<Semester | null>(
    null
  );
  const [totalRow, setTotalRow] = useState<number>(0);

  const { filters, onChangePage, onChangeRowsPerPage } =
    useFilterSlotPreference();

  useEffect(() => {
    if (semestersSelector && user) {
      // setLoadingTable(true);
      getTimeSlots({
        semesterId: semestersSelector?.id || null,
        departmentHeadId: user?.id || null,
      }).then((res) => {
        if (res.data) {
          setTimeSlots(res.data || []);
        }
      });
      getSlotPreferenceLevels({
        pagination: {
          pageNumber: filters.pageNumber,
          pageSize: filters.pageSize,
        },
        getAllRequest: {
          semesterId: semestersSelector.id || null,
          departmentHeadId: user?.id || null,
        },
      })
        .then((res) => {
          if (res.data) {
            setSlotPreferenceLevels(res.data.slotPreferenceLevels || []);
            setTotalRow(res.data.total || 0);
          }
        })
        .finally(async () => {
          // await wait(500);
          // setLoadingTable(false);
        });
    }
  }, [semestersSelector, refresh, user, filters]);

  useLayoutEffect(() => {
    setSemestersSelector(currentSemester);
  }, [currentSemester]);

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
    })
      .then((res) => {
        refetch();
      })
      .catch((err) =>
        setNotifications({
          message: 'Update error',
          severity: 'error',
        })
      );
  };

  const reUseForCurrentSemester = () => {
    reuseSlotPreference({
      fromSemesterId: semestersSelector?.id || 0,
      toSemesterId: currentSemester?.id || 0,
      departmentHeadId: user?.id || 0,
    }).then((res) => {
      if (!res.isSuccess) {
        setNotifications({ message: res.message, severity: 'error' });
        return;
      }
      setNotifications({ message: res.message, severity: 'success' });
    });
  };

  const onCreateDefaultForLecturers = () => {
    createDefaultSlotPreferenceLevels({
      departmentHeadId: user?.id || null,
      semesterId: currentSemester?.id || null,
    })
      .then((res) => {
        if (!res.isSuccess) {
          setNotifications({ message: res.message, severity: 'error' });
          return;
        }
        setNotifications({ message: res.message, severity: 'success' });
        refetch();
      })
      .catch((err) => {
        setNotifications({ message: 'Create fail', severity: 'error' });
      });
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
        {semestersSelector?.id !== currentSemester?.id &&
          slotPreferenceLevels.length > 0 && (
            <Button onClick={reUseForCurrentSemester}>
              Reuse for current semester
            </Button>
          )}
        {slotPreferenceLevels.length === 0 &&
          semestersSelector?.id === currentSemester?.id && (
            <Button onClick={onCreateDefaultForLecturers}>
              Create default for all Lecturers
            </Button>
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
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
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
                        <Typography variant="body2">
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
                            sx={{
                              backgroundColor:
                                slot.preferenceLevel && '#97cdff',
                            }}
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
      <TablePagination
        pageIndex={filters.pageNumber}
        totalPages={Math.ceil(totalRow / filters.pageSize)}
        totalRows={totalRow}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        rowsPerPage={filters.pageSize}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
      />
    </Fragment>
  );
};

export default SlotPreferenceLevel;

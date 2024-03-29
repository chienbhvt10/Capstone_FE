import { Box, CircularProgress } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete/Autocomplete';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Stack } from '@mui/system';
import {
  ChangeEvent,
  Fragment,
  KeyboardEvent,
  KeyboardEventHandler,
  SyntheticEvent,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import TableCellSelect from '~/components/OtherComponents/TableCellSelect';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import TableCustom from '~/components/TableComponents/TableCustom';
import useArrange from '~/hooks/useArrange';
import useNotification from '~/hooks/useNotification';
import useRefresh from '~/hooks/useRefresh';
import { Semester } from '~/modules/Semester/util/type';
import {
  getSubjectPreferenceLevels,
  reuseSubjectPreference,
  updateSubjectPreferenceLevel,
} from '~/services/preferenceLevel';
import { getSubjects } from '~/services/subject';
import wait from '~/utils/wait';
import { Subject } from '../../Subjects/util/type';
import { getTableSubjectColumns } from '../utils/subjectColumns';
import {
  LecturerSubjectsPreferenceInfo,
  LecturerSubjectsPreferenceLevel,
  SubjectPreferenceLevelItems,
} from '../utils/types';
import { subjectPreferenceLevelItems } from '../utils/data';
import useAuth from '~/hooks/useAuth';
import TablePagination from '~/components/TableComponents/TablePagination';
import useFilterSubjectPreference from '~/hooks/filter/useFilterSubjectPreference';
import { useDebounce } from 'react-use';

const SubjectPreferenceLevel = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const setNotifications = useNotification();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const { semesters, currentSemester } = useArrange();
  const columns = useMemo(() => getTableSubjectColumns(subjects), [subjects]);
  const [loadingTable, setLoadingTable] = useState<boolean>(false);
  const [subjectPreferenceLevels, setSubjectPreferenceLevels] = useState<
    LecturerSubjectsPreferenceLevel[]
  >([]);
  const [semestersSelector, setSemestersSelector] = useState<Semester | null>(
    null
  );
  const [totalRow, setTotalRow] = useState<number>(0);
  const { filters, onChangePage, onChangeRowsPerPage, onSearch } =
    useFilterSubjectPreference();
  const [searchValue, setSearchValue] = useState<string>('');
  const [refresh, refetch] = useRefresh();

  useEffect(() => {
    if (semestersSelector && user) {
      // setLoadingTable(true);
      getSubjects({
        semesterId: semestersSelector.id || null,
        departmentHeadId: user?.id || null,
      }).then((res) => {
        if (res.data) {
          setSubjects(res.data);
        }
      });
      getSubjectPreferenceLevels({
        lecturer: filters.lecturer || null,
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
            setSubjectPreferenceLevels(res.data?.subjectPreferenceLevels || []);
            setTotalRow(res.data?.total || 0);
          }
        })
        .finally(async () => {
          // await wait(500);
          // setLoadingTable(false);
        });
    }
  }, [refresh, semestersSelector, user, filters]);

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

  const onEdit = (item: LecturerSubjectsPreferenceInfo, value: number) => {
    updateSubjectPreferenceLevel({
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
    reuseSubjectPreference({
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onClickSearch = () => {
    onSearch(searchValue);
  };

  const onClickClear = () => {
    onSearch(null);
    setSearchValue('');
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
          subjectPreferenceLevels.length > 0 && (
            <Button onClick={reUseForCurrentSemester}>
              Reuse for current semester
            </Button>
          )}
        <TextField
          sx={{ maxWidth: 250 }}
          value={searchValue}
          variant="outlined"
          label="Search Lecturer"
          onChange={handleChange}
        />
        <Button onClick={onClickSearch}>Search</Button>
        <Button onClick={onClickClear}>Clear</Button>
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
            {(subjectPreferenceLevels.length === 0 ||
              subjects.length === 0) && (
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
                {subjectPreferenceLevels?.length > 0 &&
                  subjectPreferenceLevels.map((item, index) => (
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
                      {item.preferenceInfos?.length > 0 &&
                        item.preferenceInfos.map((subject, index) => (
                          <TableCellCustom
                            key={index + 2}
                            align="center"
                            minHeight={60}
                            border={true}
                            sx={{
                              backgroundColor:
                                subject.preferenceLevel > 0
                                  ? '#97cdff'
                                  : '#FFF',
                            }}
                          >
                            <TableCellSelect<SubjectPreferenceLevelItems>
                              value={subject.preferenceLevel}
                              selectTitle="Select preference level"
                              selectItems={subjectPreferenceLevelItems}
                              item={subject}
                              callback={onEdit}
                              disabled={
                                currentSemester?.id !== semestersSelector?.id
                              }
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

export default SubjectPreferenceLevel;

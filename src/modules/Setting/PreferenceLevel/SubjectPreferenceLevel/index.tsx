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
import { Fragment, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import TableCellSelect from '~/components/OtherComponents/TableCellSelect';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import TableCustom from '~/components/TableComponents/TableCustom';
import useArrange from '~/hooks/useArrange';
import useNotification from '~/hooks/useNotification';
import useRefresh from '~/hooks/useRefresh';
import { Semester } from '~/modules/Semester/util/type';
import {
  getSubjectPreferenceLevels,
  updateSubjectPreferenceLevel,
} from '~/services/preferenceLevel';
import { getSubjects } from '~/services/subject';
import wait from '~/utils/wait';
import { Subject } from '../../Subjects/util/type';
import { subjectPreferenceLevelItems } from '../utils/data';
import { getTableSubjectColumns } from '../utils/subjectColumns';
import {
  LecturerSubjectsPreferenceInfo,
  LecturerSubjectsPreferenceLevel,
  SubjectPreferenceLevelItems,
} from '../utils/types';

const SubjectPreferenceLevel = () => {
  const theme = useTheme();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const setNotification = useNotification();
  const { semesters, currentSemester } = useArrange();
  const columns = useMemo(() => getTableSubjectColumns(subjects), [subjects]);
  const [loadingTable, setLoadingTable] = useState<boolean>(false);
  const [subjectPreferenceLevels, setSubjectPreferenceLevels] = useState<
    LecturerSubjectsPreferenceLevel[]
  >([]);
  const [semestersSelector, setSemestersSelector] = useState<Semester | null>(
    null
  );
  const [refresh, refetch] = useRefresh();

  useEffect(() => {
    if (currentSemester) {
      getSubjects().then((res) => {
        if (res.data) {
          setSubjects(res.data);
        }
      });
      setSemestersSelector(currentSemester);
    }
  }, [currentSemester]);

  useEffect(() => {
    if (semestersSelector) {
      setLoadingTable(true);
      getSubjects().then((res) => {
        if (res.data) {
          setSubjects(res.data);
        }
      });
      getSubjectPreferenceLevels({ semesterId: semestersSelector?.id || 0 })
        .then((res) => {
          setSubjectPreferenceLevels(res.data || []);
        })
        .finally(async () => {
          await wait(500);
          setLoadingTable(false);
        });
    }
  }, [refresh, semestersSelector]);

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
                          >
                            <TableCellSelect<SubjectPreferenceLevelItems>
                              value={subject.preferenceLevel}
                              selectTitle="Select preference level"
                              selectItems={subjectPreferenceLevelItems}
                              item={subject}
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

export default SubjectPreferenceLevel;

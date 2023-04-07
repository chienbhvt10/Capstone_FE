import { Box, CircularProgress } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useEffect, useMemo, useState } from 'react';
import TableCellSelect from '~/components/OtherComponents/TableCellSelect';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import TableCustom from '~/components/TableComponents/TableCustom';
import useNotification from '~/hooks/useNotification';
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
import { useTheme } from '@mui/material/styles';

const SubjectPreferenceLevel = () => {
  const theme = useTheme();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const setNotification = useNotification();
  const columns = useMemo(() => getTableSubjectColumns(subjects), [subjects]);
  const [loadingTable, setLoadingTable] = useState<boolean>(false);
  const [subjectPreferenceLevels, setSubjectPreferenceLevels] = useState<
    LecturerSubjectsPreferenceLevel[]
  >([]);

  useEffect(() => {
    getSubjects().then((res) => {
      if (res.data) {
        setSubjects(res.data);
      }
    });
  }, []);

  useEffect(() => {
    setLoadingTable(true);
    getSubjectPreferenceLevels()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setSubjectPreferenceLevels(res.data);
        }
      })
      .finally(async () => {
        await wait(500);
        setLoadingTable(false);
      });
  }, []);

  const onEdit = (item: LecturerSubjectsPreferenceInfo, value: number) => {
    updateSubjectPreferenceLevel({
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
                    <Typography variant="body1">{item.lecturerName}</Typography>
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
      )}
    </TableContainer>
  );
};

export default SubjectPreferenceLevel;

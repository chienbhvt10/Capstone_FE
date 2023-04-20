import { Button, Stack } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete/Autocomplete';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import React, {
  SyntheticEvent,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import TableCustom from '~/components/TableComponents/TableCustom';
import TableToolCustom from '~/components/TableComponents/TableToolCustom';
import useArrange from '~/hooks/useArrange';
import { Semester } from '~/modules/Semester/util/type';
import {
  deleteSubject,
  getSubject,
  getSubjects,
  reuseSubject,
} from '~/services/subject';
import { getSubjectTableColumns } from '../util/columns';
import { Subject } from '../util/type';
import useNotification from '~/hooks/useNotification';
import useRefresh from '~/hooks/useRefresh';
import useAuth from '~/hooks/useAuth';

interface Props {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingItem: React.Dispatch<React.SetStateAction<Subject | null>>;
  setSemestersSelector: React.Dispatch<React.SetStateAction<Semester | null>>;
  refetch: React.DispatchWithoutAction;
  semestersSelector: Semester | null;
  subjects: Subject[];
}

const SubjectTable = (props: Props) => {
  const theme = useTheme();
  const { user } = useAuth();
  const setNotifications = useNotification();
  const {
    setEditMode,
    setEditingItem,
    refetch,
    setSemestersSelector,
    semestersSelector,
    subjects,
  } = props;
  const columns = useMemo(() => getSubjectTableColumns(), []);
  const { semesters, currentSemester } = useArrange();

  useLayoutEffect(() => {
    setSemestersSelector(currentSemester);
  }, [currentSemester]);

  const onEdit = (item: Subject) => async () => {
    setEditMode(true);
    setEditingItem(item);
  };

  const onDelete = (item: Subject) => async () => {
    await deleteSubject(item.id).then((res) => refetch());
  };

  const onChangeSemestersSelector = (
    event: SyntheticEvent,
    newValue: Semester | null
  ) => {
    setSemestersSelector(newValue);
    refetch();
  };

  const reUseForCurrentSemester = () => {
    reuseSubject({
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

  return (
    <Stack direction="column" spacing={2} sx={{ width: 1 }}>
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
          subjects.length > 0 && (
            <Button onClick={reUseForCurrentSemester}>
              Reuse for current semester
            </Button>
          )}
      </Stack>
      <TableContainer sx={{ maxHeight: 600 }}>
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
            {subjects.length === 0 && (
              <Typography variant="body2" sx={{ color: 'error.main' }}>
                Please insert more information
              </Typography>
            )}
            {subjects?.length > 0 &&
              subjects.map((item, index) => (
                <TableRow role="checkbox" tabIndex={-1} key={item.id}>
                  <TableCellCustom align="center" border={true} hover={true}>
                    <Typography variant="body2">{index + 1}</Typography>
                  </TableCellCustom>
                  <TableCellCustom align="center" border={true} hover={true}>
                    <Typography variant="body2">{item.code}</Typography>
                  </TableCellCustom>
                  <TableCellCustom align="center" border={true} hover={true}>
                    <Typography variant="body2">{item.name}</Typography>
                  </TableCellCustom>

                  <TableCellCustom align="center" border={true} hover={true}>
                    <TableToolCustom
                      item={item}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </TableCellCustom>
                </TableRow>
              ))}
          </TableBody>
        </TableCustom>
      </TableContainer>
    </Stack>
  );
};

export default SubjectTable;

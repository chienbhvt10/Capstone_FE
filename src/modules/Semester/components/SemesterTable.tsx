import { Backdrop, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useMemo, useState } from 'react';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import TableCustom from '~/components/TableComponents/TableCustom';
import TableToolCustom from '~/components/TableComponents/TableToolCustom';
import useArrange from '~/hooks/useArrange';
import { deleteSemester, updateSemester } from '~/services/semester';
import { getSemesterTableColumns } from '../util/columns';
import { Semester } from '../util/type';
import wait from '~/utils/wait';

interface Props {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingItem: React.Dispatch<React.SetStateAction<Semester | null>>;
}

const SemesterTable = (props: Props) => {
  const theme = useTheme();
  const { setEditMode, setEditingItem } = props;
  const {
    refetchSemester,
    semesters,
    refetchLecturer,
    refetchRoom,
    refetchClass,
    refetchSubject,
    refetchTimeSlot,
  } = useArrange();
  const [loading, setLoading] = useState<boolean>(false);
  const columns = useMemo(() => getSemesterTableColumns(), []);

  const onEdit = (item: Semester) => async () => {
    setEditMode(true);
    setEditingItem(item);
  };

  const onDelete = (item: Semester) => async () => {
    await deleteSemester(item.id).then((res) => refetchSemester());
  };

  const onChangeCurrentSemester = (item: Semester) => async () => {
    if (!item.isNow) {
      setLoading(true);
      const res = await updateSemester({
        ...item,
        isNow: true,
      });
      if (res.isSuccess) {
        refetchSemester();
        refetchLecturer();
        refetchRoom();
        refetchClass();
        refetchSubject();
        refetchTimeSlot();
      }
      await wait(2000);
      setLoading(false);
    }
  };

  return (
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
                <Tooltip
                  title={
                    item.label === 'Current Semester' &&
                    'Double click on cell to set current semester'
                  }
                  placement="top"
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
                </Tooltip>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {semesters?.length > 0 &&
            semesters.map((item, index) => (
              <TableRow role="checkbox" tabIndex={-1} key={Math.random()}>
                <TableCellCustom align="center" border={true} hover={true}>
                  <Typography variant="body2">{index + 1}</Typography>
                </TableCellCustom>
                <TableCellCustom align="center" border={true} hover={true}>
                  <Typography variant="body2">{item.semester}</Typography>
                </TableCellCustom>
                <TableCellCustom align="center" border={true} hover={true}>
                  <Typography variant="body2">{item.year}</Typography>
                </TableCellCustom>

                <TableCellCustom
                  align="center"
                  border={true}
                  hover={true}
                  onDoubleClick={onChangeCurrentSemester(item)}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontStyle: 'italic',
                      fontWeight: 'bold',
                      color: 'success.main',
                    }}
                  >
                    {item.isNow ? 'CURRENT_SEMESTER' : ''}
                  </Typography>
                </TableCellCustom>

                <TableCellCustom align="center" border={true} hover={true}>
                  <TableToolCustom
                    item={item}
                    onEdit={onEdit}
                    displayDeleteButton={false}
                  />
                </TableCellCustom>
              </TableRow>
            ))}
        </TableBody>
      </TableCustom>
      <Backdrop
        sx={{
          color: '#fff',
          mt: '0 !important',
          zIndex: 9999,
        }}
        open={loading}
      >
        <Stack direction="column" spacing={2} sx={{ alignItems: 'center' }}>
          <CircularProgress sx={{ color: 'white' }} />
          <Typography variant="body1">
            Change all data to this semester ...
          </Typography>
        </Stack>
      </Backdrop>
    </TableContainer>
  );
};

export default SemesterTable;

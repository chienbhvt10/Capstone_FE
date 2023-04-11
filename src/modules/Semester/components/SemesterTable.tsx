import { Container } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import TableCustom from '~/components/TableComponents/TableCustom';
import TableToolCustom from '~/components/TableComponents/TableToolCustom';
import { deleteSubject } from '~/services/subject';
import { getSemesterTableColumns } from '../util/columns';
import { useTheme } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import useArrange from '~/hooks/useArrange';
import { Semester } from '../util/type';
import { deleteSemester } from '~/services/semester';

interface Props {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingItem: React.Dispatch<React.SetStateAction<Semester | null>>;
}

const SemesterTable = (props: Props) => {
  const theme = useTheme();
  const { setEditMode, setEditingItem } = props;
  const { refetchSemester, semesters } = useArrange();
  const columns = useMemo(() => getSemesterTableColumns(), []);

  const onEdit = (item: Semester) => async () => {
    setEditMode(true);
    setEditingItem(item);
  };

  const onDelete = (item: Semester) => async () => {
    await deleteSemester(item.id).then((res) => refetchSemester());
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
          {semesters?.length > 0 &&
            semesters.map((item, index) => (
              <TableRow role="checkbox" tabIndex={-1} key={item.id}>
                <TableCellCustom align="center" border={true} hover={true}>
                  <Typography variant="body2">{index}</Typography>
                </TableCellCustom>
                <TableCellCustom align="center" border={true} hover={true}>
                  <Typography variant="body2">{item.semester}</Typography>
                </TableCellCustom>
                <TableCellCustom align="center" border={true} hover={true}>
                  <Typography variant="body2">{item.year}</Typography>
                </TableCellCustom>
                <TableCellCustom align="center" border={true} hover={true}>
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
                    onDelete={onDelete}
                  />
                </TableCellCustom>
              </TableRow>
            ))}
        </TableBody>
      </TableCustom>
    </TableContainer>
  );
};

export default SemesterTable;

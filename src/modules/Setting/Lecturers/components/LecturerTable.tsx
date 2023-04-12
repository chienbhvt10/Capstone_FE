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
import { Lecturer } from '~/modules/Lecturer/util/type';
import { deleteLecturer } from '~/services/lecturer';
import { getLecturersTableColumns } from '../util/columns';
import { useTheme } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import useArrange from '~/hooks/useArrange';

interface Props {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingItem: React.Dispatch<React.SetStateAction<Lecturer | null>>;
}

const LecturerTable = (props: Props) => {
  const theme = useTheme();
  const { setEditMode, setEditingItem } = props;
  const { lecturers, refetchLecturer } = useArrange();
  const columns = useMemo(() => getLecturersTableColumns(), []);

  const onEdit = (item: Lecturer) => () => {
    setEditMode(true);
    setEditingItem(item);
  };

  const onDelete = (item: Lecturer) => async () => {
    await deleteLecturer(item.id)
      .then((res) => refetchLecturer())
      .catch((err) => {});
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
          {lecturers?.length > 0 &&
            lecturers.map((item, index) => (
              <TableRow role="checkbox" tabIndex={-1} key={item.id}>
                <TableCellCustom align="center" border={true} hover={true}>
                  <Typography variant="body2">{index}</Typography>
                </TableCellCustom>
                <TableCellCustom align="center" border={true} hover={true}>
                  <Typography variant="body2">{item.email}</Typography>
                </TableCellCustom>
                <TableCellCustom align="center" border={true} hover={true}>
                  <Typography variant="body2">{item.name}</Typography>
                </TableCellCustom>
                <TableCellCustom align="center" border={true} hover={true}>
                  <Typography variant="body2">{item.shortName}</Typography>
                </TableCellCustom>
                <TableCellCustom align="center" border={true} hover={true}>
                  <Typography variant="body2">{item.quota}</Typography>
                </TableCellCustom>
                <TableCellCustom align="center" border={true} hover={true}>
                  <Typography variant="body2">{item.minQuota}</Typography>
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

export default LecturerTable;

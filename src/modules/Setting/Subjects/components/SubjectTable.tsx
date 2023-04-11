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
import { getSubjectTableColumns } from '../util/columns';
import { Subject } from '../util/type';
import { useTheme } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import useArrange from '~/hooks/useArrange';

interface Props {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingItem: React.Dispatch<React.SetStateAction<Subject | null>>;
}

const SubjectTable = (props: Props) => {
  const theme = useTheme();
  const { setEditMode, setEditingItem } = props;
  const { refetchSubject, subjects } = useArrange();
  const columns = useMemo(() => getSubjectTableColumns(), []);

  const onEdit = (item: Subject) => async () => {
    setEditMode(true);
    setEditingItem(item);
  };

  const onDelete = (item: Subject) => async () => {
    await deleteSubject(item.id).then((res) => refetchSubject());
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
          {subjects?.length > 0 &&
            subjects.map((item, index) => (
              <TableRow role="checkbox" tabIndex={-1} key={item.id}>
                <TableCellCustom align="center" border={true} hover={true}>
                  <Typography variant="body2">{index}</Typography>
                </TableCellCustom>
                <TableCellCustom align="center" border={true} hover={true}>
                  <Typography variant="body2">{item.code}</Typography>
                </TableCellCustom>
                <TableCellCustom align="center" border={true} hover={true}>
                  <Typography variant="body2">{item.name}</Typography>
                </TableCellCustom>
                <TableCellCustom align="center" border={true} hover={true}>
                  <Typography variant="body2">{item.department}</Typography>
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

export default SubjectTable;

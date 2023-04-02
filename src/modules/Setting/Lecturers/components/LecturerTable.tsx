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

interface Props {
  lecturers: Lecturer[];
  setLecturers: React.Dispatch<React.SetStateAction<Lecturer[]>>;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingItem: React.Dispatch<React.SetStateAction<Lecturer | null>>;
}

const LecturerTable = (props: Props) => {
  const { lecturers, setLecturers, setEditMode, setEditingItem } = props;

  const columns = useMemo(() => getLecturersTableColumns(), []);

  const onEdit = (item: Lecturer) => () => {
    setEditMode(true);
    setEditingItem(item);
  };

  const onDelete = (item: Lecturer) => async () => {
    await deleteLecturer(item.id)
      .then((res) => {
        const newLecturer = lecturers.filter(
          (lecturer) => item.id != lecturer.id
        );
        setLecturers(newLecturer);
      })
      .catch((err) => {});
  };

  return (
    <Container maxWidth="lg">
      <TableContainer sx={{ maxHeight: 550 }}>
        <TableCustom>
          <TableHead>
            <TableRow>
              {columns.map((item) => (
                <TableCellCustom
                  key={item.id}
                  align={item.align}
                  stickyPosition={item.stickyPosition}
                  sticky={item.sticky}
                  minWidth={100}
                >
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {item.label}
                  </Typography>
                </TableCellCustom>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {lecturers?.length > 0 &&
              lecturers.map((item) => (
                <TableRow role="checkbox" tabIndex={-1} key={item.id}>
                  <TableCellCustom align="center" border={true} hover={true}>
                    <Typography variant="body1">{item.email}</Typography>
                  </TableCellCustom>
                  <TableCellCustom align="center" border={true} hover={true}>
                    <Typography variant="body1">{item.name}</Typography>
                  </TableCellCustom>
                  <TableCellCustom align="center" border={true} hover={true}>
                    <Typography variant="body1">{item.shortName}</Typography>
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
    </Container>
  );
};

export default LecturerTable;

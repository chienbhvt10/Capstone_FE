import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import TableCustom from '~/components/TableComponents/TableCustom';
import { getSubjectTableColumns } from '../util/columns';
import { roomDistanceData } from '../util/data';
import TableToolCustom from '~/components/TableComponents/TableToolCustom';
import { Container } from '@mui/material';

const SubjectTable = () => {
  const columns = useMemo(() => getSubjectTableColumns(), []);

  const onEdit = (item: any) => () => {};

  const onDelete = (item: any) => () => {};

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
            {roomDistanceData.map((item, index) => (
              <TableRow role="checkbox" tabIndex={-1} key={index + 1}>
                <TableCellCustom align="center" border={true} hover={true}>
                  <Typography variant="body1">{item.subjectCode}</Typography>
                </TableCellCustom>
                <TableCellCustom align="center" border={true} hover={true}>
                  <Typography variant="body1">{item.subjectName}</Typography>
                </TableCellCustom>
                <TableCellCustom align="center" border={true} hover={true}>
                  <Typography variant="body1">{item.department}</Typography>
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

export default SubjectTable;

import { Container } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useEffect, useMemo, useState } from 'react';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import TableCustom from '~/components/TableComponents/TableCustom';
import TableToolCustom from '~/components/TableComponents/TableToolCustom';
import { getSubjects } from '~/services/subject';
import { getSubjectTableColumns } from '../util/columns';
import { Subject } from '../util/type';

const SubjectTable = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    getSubjects().then((res) => {
      if (res.data) {
        setSubjects(res.data);
      }
    });
  }, []);

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
            {subjects?.length &&
              subjects?.length > 0 &&
              subjects.map((item) => (
                <TableRow role="checkbox" tabIndex={-1} key={item.id}>
                  <TableCellCustom align="center" border={true} hover={true}>
                    <Typography variant="body1">{item.code}</Typography>
                  </TableCellCustom>
                  <TableCellCustom align="center" border={true} hover={true}>
                    <Typography variant="body1">{item.name}</Typography>
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

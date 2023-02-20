import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import {
  lecturerSubjectPreferenceLevel,
  subjectPreferenceLevelItems,
} from '../utils/data';
import { getTableSubjectColumns } from '../utils/subjectColumns';
import { useMemo } from 'react';
import TableCustom from '~/components/table/TableCustom';
import TableCellCustom from '~/components/table/TableCellCustom';
import TableCellSelect from '~/components/specificComponent/TableCellSelect';
import { SubjectPreferenceLevelItems } from '../utils/types';

const SubjectPreferenceLevel = () => {
  const theme = useTheme();

  const columns = useMemo(() => getTableSubjectColumns(), []);

  return (
    <TableContainer sx={{ maxHeight: 550 }}>
      <TableCustom>
        <TableHead>
          <TableRow>
            {columns.map((item) => (
              <TableCellCustom
                key={item.id}
                align={item.align}
                sticky={item.sticky}
                stickyPosition={item.stickyPosition}
                minWidth={item.minWidth}
                minHeight={item.minHeight}
              >
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {item.label}
                </Typography>
              </TableCellCustom>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {lecturerSubjectPreferenceLevel.map((item, index) => (
            <TableRow role="checkbox" tabIndex={-1} key={index + 1}>
              <TableCellCustom
                align="center"
                sticky={true}
                stickyPosition="left"
                minHeight={60}
              >
                <Typography variant="body1">{item.lecturer}</Typography>
              </TableCellCustom>
              {item.subjects.map((subject, index) => (
                <TableCellCustom key={index + 2} align="center" minHeight={60}>
                  <TableCellSelect<SubjectPreferenceLevelItems>
                    value={subject.preferenceLevel}
                    selectTitle="Select preference level"
                    selectItems={subjectPreferenceLevelItems}
                    item={subject}
                  />
                </TableCellCustom>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TableCustom>
    </TableContainer>
  );
};

export default SubjectPreferenceLevel;

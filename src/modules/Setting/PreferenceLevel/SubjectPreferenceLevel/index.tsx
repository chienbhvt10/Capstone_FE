import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import TableCellSelect from '~/components/OtherComponents/TableCellSelect';
import {
  lecturerSubjectPreferenceLevel,
  subjectPreferenceLevelItems,
} from '../utils/data';
import { getTableSubjectColumns } from '../utils/subjectColumns';
import { SubjectPreferenceLevelItems } from '../utils/types';
import TableCellCustom from '~/components/TableComponents/TableCellCustom';
import TableCustom from '~/components/TableComponents/TableCustom';

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

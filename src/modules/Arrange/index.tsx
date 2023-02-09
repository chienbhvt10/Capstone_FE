import { Box, Stack } from '@mui/material';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';
import PageWrapper from '../../components/PageWrapper';
import FilterForm from './components/FilterForm';
import TimetableModify from './components/TimetableModify';
import ToolBox from './components/ToolBox';
import TimeTable from './components/TimeTable';

interface Props {}

const ArrangePage = (props: Props) => {
  return (
    <PageWrapper title="Arrange Page">
      <PageBreadcrumbs title={'Arrange'} breadcrumbs={[]} />
      <Stack
        direction="column"
        spacing={2}
        sx={{ backgroundColor: 'background.paper', p: 2 }}
      >
        <FilterForm />
        <Stack direction="row" spacing={2}>
          <TimetableModify />
          <Stack
            direction="column"
            spacing={2}
            sx={{ width: 'calc(100% - 250px)' }}
          >
            <ToolBox />
            <TimeTable />
          </Stack>
        </Stack>
      </Stack>
    </PageWrapper>
  );
};

export default ArrangePage;

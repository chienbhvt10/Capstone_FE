import { Stack } from '@mui/material';
import PageWrapper from '~/components/PageWrapper';
import FilterForm from './components/FilterForm';
import TimeTable from './components/TimeTable';
import TimetableModify from './components/TimetableModify';
import ToolBox from './components/ToolBox';

interface Props {}

const ArrangePage = (props: Props) => {
  return (
    <PageWrapper title="Arrange Page">
      {/* <PageBreadcrumbs title={'Arrange'} breadcrumbs={[]} /> */}
      <Stack
        direction="column"
        spacing={2}
        sx={{
          backgroundColor: 'background.paper',
          p: 2,
          pb: 6,
          overflowX: 'hidden',
        }}
      >
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

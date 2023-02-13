import Paper from '@mui/material/Paper';
import PageWrapper from '~/components/PageWrapper';
import FilterTable from './components/FilterTable';
import TimeTable from './components/TimeTable';

const TimeTablePage = () => {
  return (
    <PageWrapper title="TimeTable Page">
      {/* <PageBreadcrumbs title={'TimeTable'} breadcrumbs={[]} /> */}
      <Paper
        elevation={12}
        sx={{
          background: '#FFFFFF',
          p: 2,
          overflowX: 'auto',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 120px)',
        }}
      >
        <FilterTable />
        <TimeTable />
      </Paper>
    </PageWrapper>
  );
};

export default TimeTablePage;

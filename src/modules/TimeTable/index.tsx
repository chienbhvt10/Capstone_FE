import Paper from '@mui/material/Paper';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';
import PageWrapper from '../../components/PageWrapper';
import TimeTable from './components/TimeTable';
import FilterTable from './components/FilterTable';

const TimeTablePage = () => {
  return (
    <PageWrapper title="TimeTable Page">
      <PageBreadcrumbs title={'TimeTable'} breadcrumbs={[]} />
      <Paper elevation={12} sx={{ background: '#FFFFFF', p: 2 }}>
        <FilterTable />
        <TimeTable />
      </Paper>
    </PageWrapper>
  );
};

export default TimeTablePage;

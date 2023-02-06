import { Box } from '@mui/material';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';
import PageWrapper from '../../components/PageWrapper';

type Props = {};

const TimeTablePage = (props: Props) => {
  return (
    <PageWrapper title="TimeTable Page">
      <PageBreadcrumbs title={'TimeTable'} breadcrumbs={[]} />
      <Box></Box>
    </PageWrapper>
  );
};

export default TimeTablePage;

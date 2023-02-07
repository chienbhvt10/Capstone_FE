import { Box } from '@mui/material';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';
import PageWrapper from '../../components/PageWrapper';

const ManagePage = () => {
  return (
    <PageWrapper title="Manage Page">
      <PageBreadcrumbs title={'Manage'} breadcrumbs={[]} />
      <Box></Box>
    </PageWrapper>
  );
};

export default ManagePage;

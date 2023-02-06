import { Box } from '@mui/material';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';
import PageWrapper from '../../components/PageWrapper';

type Props = {};

const ManagePage = (props: Props) => {
  return (
    <PageWrapper title="Manage Page">
      <PageBreadcrumbs title={'Manage'} breadcrumbs={[]} />
      <Box></Box>
    </PageWrapper>
  );
};

export default ManagePage;

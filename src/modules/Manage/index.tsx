import { Box } from '@mui/material';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';
import PageWrapper from '../../components/PageWrapper';
import Stack from '@mui/material/Stack';
import Toolbox from './components/Toolbox';
import LecturerTable from './components/LecturerTable';

const ManagePage = () => {
  return (
    <PageWrapper title="Manage Page">
      {/* <PageBreadcrumbs title={'Manage'} breadcrumbs={[]} /> */}
      <Stack
        direction="column"
        spacing={2}
        sx={{ backgroundColor: 'background.paper', p: 2, overflowX: 'auto' }}
      >
        <Toolbox />
        <LecturerTable />
      </Stack>
    </PageWrapper>
  );
};

export default ManagePage;

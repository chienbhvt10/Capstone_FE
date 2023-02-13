import Stack from '@mui/material/Stack';
import PageWrapper from '~/components/PageWrapper';
import LecturerTable from './components/LecturerTable';
import Toolbox from './components/Toolbox';

const ManagePage = () => {
  return (
    <PageWrapper title="Manage Page">
      {/* <PageBreadcrumbs title={'Manage'} breadcrumbs={[]} /> */}
      <Stack
        direction="column"
        spacing={2}
        sx={{
          backgroundColor: 'background.paper',
          p: 2,
          overflowX: 'auto',
          height: 'calc(100vh - 120px)',
        }}
      >
        <Toolbox />
        <LecturerTable />
      </Stack>
    </PageWrapper>
  );
};

export default ManagePage;

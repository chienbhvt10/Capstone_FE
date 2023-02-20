import { Stack } from '@mui/material';
import PageWrapper from '~/components/PageWrapper';
import RegisterScheduleForm from '../components/RegisterScheduleForm';

const LecturerRegisterEdit = () => {
  return (
    <PageWrapper title="Register Page">
      {/* <PageBreadcrumbs title={'Register'} breadcrumbs={[]} /> */}
      <Stack
        direction="column"
        spacing={2}
        sx={{
          backgroundColor: 'background.paper',
          p: 2,
          overflowX: 'auto',
          height: 'calc(100vh - 60px)',
        }}
      >
        <RegisterScheduleForm title="Register Subject-Slot Edit" />
      </Stack>
    </PageWrapper>
  );
};

export default LecturerRegisterEdit;

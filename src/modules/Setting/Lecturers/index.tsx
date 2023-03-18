import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

import PageWrapper from '~/components/PageWrapper';
import LecturerTable from './components/LecturerTable';
import LecturerForm from './components/LecturerForm';

const LecturersSetting = () => {
  return (
    <PageWrapper title="Lecturers Setting">
      {/* <PageBreadcrumbs title={'Arrange'} breadcrumbs={[]} /> */}
      <Stack
        direction="column"
        spacing={4}
        sx={{
          backgroundColor: 'background.paper',
          p: 2,
          pb: 6,
          overflowX: 'hidden',
          alignItems: 'center',
          height: 'calc(100vh - 60px)',
        }}
      >
        <Typography variant="h6" sx={{ alignSelf: 'flex-start', ml: 4 }}>
          Lecturer Setting
        </Typography>
        <LecturerForm />
        <LecturerTable />
      </Stack>
    </PageWrapper>
  );
};

export default LecturersSetting;

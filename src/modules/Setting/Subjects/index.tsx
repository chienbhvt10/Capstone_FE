import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

import PageWrapper from '~/components/PageWrapper';
import SubjectTable from './components/SubjectTable';
import SubjectForm from './components/SubjectForm';

const SubjectsSetting = () => {
  return (
    <PageWrapper title="Subjects Setting">
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
          Subject Setting
        </Typography>
        <SubjectForm />
        <SubjectTable />
      </Stack>
    </PageWrapper>
  );
};

export default SubjectsSetting;

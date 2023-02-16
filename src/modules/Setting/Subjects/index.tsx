import { Stack } from '@mui/material';
import PageWrapper from '~/components/PageWrapper';

const SubjectsSetting = () => {
  return (
    <PageWrapper title="Subjects Setting">
      {/* <PageBreadcrumbs title={'Arrange'} breadcrumbs={[]} /> */}
      <Stack
        direction="column"
        spacing={2}
        sx={{
          backgroundColor: 'background.paper',
          p: 2,
          pb: 6,
          overflowX: 'hidden',
        }}
      ></Stack>
    </PageWrapper>
  );
};

export default SubjectsSetting;

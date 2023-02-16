import { Stack } from '@mui/material';
import PageWrapper from '~/components/PageWrapper';

const PreferenceLevelSetting = () => {
  return (
    <PageWrapper title="Preference Level Setting">
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

export default PreferenceLevelSetting;

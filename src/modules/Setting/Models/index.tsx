import { Stack } from '@mui/material';
import PageWrapper from '~/components/PageWrapper';
import ModelForm from './components/ModelForm';

const ModelSetting = () => {
  return (
    <PageWrapper title="Models Setting">
      {/* <PageBreadcrumbs title={'Arrange'} breadcrumbs={[]} /> */}
      <Stack
        direction="column"
        spacing={2}
        sx={{
          backgroundColor: 'background.paper',
          p: 2,
          pb: 6,
        }}
      >
        <Stack
          direction="column"
          spacing={2}
          sx={{ height: 'calc(100vh - 120px)' }}
        >
          <ModelForm />
        </Stack>
      </Stack>
    </PageWrapper>
  );
};

export default ModelSetting;

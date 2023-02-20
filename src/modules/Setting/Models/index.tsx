import { Stack, Typography } from '@mui/material';
import PageWrapper from '~/components/PageWrapper';
import ModelForm from './components/ModelForm';

const ModelSetting = () => {
  return (
    <PageWrapper title="Models Setting">
      {/* <PageBreadcrumbs title={'Arrange'} breadcrumbs={[]} /> */}
      <Stack
        direction="column"
        spacing={4}
        sx={{
          backgroundColor: 'background.paper',
          p: 2,
          pb: 6,
          alignItems: 'center',
          height: 'calc(100vh - 60px)',
        }}
      >
        <Stack direction="row" sx={{ alignSelf: 'flex-start', ml: 4 }}>
          <Typography component="span" variant="h6">
            Model
          </Typography>
          <Typography component="span" variant="body1" color="error.main">
            *
          </Typography>
        </Stack>
        <ModelForm />
      </Stack>
    </PageWrapper>
  );
};

export default ModelSetting;

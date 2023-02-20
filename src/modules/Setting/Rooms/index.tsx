import { Box, Stack, Typography } from '@mui/material';
import PageWrapper from '~/components/PageWrapper';
import RoomForm from './components/RoomForm';
import RoomTable from './components/RoomTable';

const RoomsSettings = () => {
  return (
    <PageWrapper title="Distance Setting">
      {/* <PageBreadcrumbs title={'Arrange'} breadcrumbs={[]} /> */}
      <Stack
        direction="column"
        spacing={2}
        sx={{
          backgroundColor: 'background.paper',
          p: 3,
          pb: 6,
          overflowX: 'hidden',
          height: 'calc(100vh - 60px)',
        }}
      >
        <Typography variant="h6">Distance Settings</Typography>
        <RoomForm />
        <RoomTable />
      </Stack>
    </PageWrapper>
  );
};

export default RoomsSettings;

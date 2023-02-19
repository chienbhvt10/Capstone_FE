import { Box, Stack, Typography } from '@mui/material';
import PageWrapper from '~/components/PageWrapper';
import RoomForm from './components/RoomForm';
import RoomTable from './components/RoomTable';

const RoomsSettings = () => {
  return (
    <PageWrapper title="Rooms Setting">
      {/* <PageBreadcrumbs title={'Arrange'} breadcrumbs={[]} /> */}
      <Stack
        direction="column"
        spacing={4}
        sx={{
          backgroundColor: 'background.paper',
          p: 2,
          pb: 6,
          overflowX: 'hidden',
          height: 'calc(100vh - 120px)',
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

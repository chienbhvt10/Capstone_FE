import {
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import PageWrapper from '~/components/PageWrapper';

interface Props {}

const LecturerProfilePage = (props: Props) => {
  const [profile, setProfile] = useState();

  return (
    <PageWrapper title="Register Page">
      {/* <PageBreadcrumbs title={'Register'} breadcrumbs={[]} /> */}
      <Stack
        direction="column"
        spacing={2}
        sx={{
          backgroundColor: 'background.paper',
          p: 2,
          height: 'calc(100vh - 60px)',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h5" align="center" sx={{ mb: 3 }}>
            Lecturer's Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item xs={4}>
                  <Typography variant="body2">Lecturer Name</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField variant="outlined" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item xs={4}>
                  <Typography variant="body2">Position</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField variant="outlined" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item xs={4}>
                  <Typography variant="body2">Short Name</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField variant="outlined" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item xs={4}>
                  <Typography variant="body2">Department</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField variant="outlined" />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item xs={4}>
                  <Typography variant="body2">Phone Number</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField variant="outlined" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item xs={4}>
                  <Typography variant="body2">Full-time Lecturer</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField variant="outlined" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item xs={4}>
                  <Typography variant="body2">Email</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField variant="outlined" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item xs={4}>
                  <Typography variant="body2">Min of classes Quota</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField variant="outlined" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Grid
                container
                sx={{ alignItems: 'center', justifyContent: 'center' }}
              >
                <Button size="medium">Edit Profile</Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Stack>
    </PageWrapper>
  );
};

export default LecturerProfilePage;

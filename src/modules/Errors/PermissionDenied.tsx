import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LinkButton from 'components/LinkButton';
import Page from 'components/Page';
import { HOME_PATH } from 'constants/route-path';

const PermissionDenied = () => {
  return (
    <Page title="Permission Denied">
      <Container
        sx={{
          display: 'grid',
          placeContent: 'center',
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <AdminPanelSettingsIcon fontSize="large" color="error" />
          <Typography
            variant="h5"
            gutterBottom
            sx={{ mt: 1.5, fontWeight: 'medium' }}
            color="error"
          >
            Permission Denied
          </Typography>
          <Typography variant="subtitle2">
            You do not have permission to access this page
          </Typography>
          <LinkButton
            to={HOME_PATH}
            variant="contained"
            startIcon={<ArrowBackIcon />}
            color="error"
            sx={{ mt: 4 }}
          >
            Back to Home
          </LinkButton>
        </Box>
      </Container>
    </Page>
  );
};

export default PermissionDenied;

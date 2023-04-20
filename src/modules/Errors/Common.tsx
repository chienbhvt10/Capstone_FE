import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LinkButton from 'components/LinkButton';
import Page from 'components/Page';
import { HOME_PATH } from 'constants/route-path';

const Common = () => {
  return (
    <Page title="Error">
      <Container
        sx={{
          display: 'grid',
          placeContent: 'center',
          flexGrow: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'error.main',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Something went wrong
          </Typography>
          <Typography variant="body1" sx={{ mb: 5 }}>
            Please try again or refresh the page.
          </Typography>
          <LinkButton
            to={HOME_PATH}
            variant="contained"
            startIcon={<ArrowBackIcon />}
          >
            Back to Home
          </LinkButton>
        </Box>
      </Container>
    </Page>
  );
};

export default Common;

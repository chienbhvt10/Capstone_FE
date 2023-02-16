import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Image from '~/components/Image';
import PageWrapper from '~/components/PageWrapper';

const NotFound = () => {
  return (
    <PageWrapper title="Page not found">
      <Container
        sx={{
          display: 'grid',
          placeContent: 'center',
          flexGrow: 1,
          height: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Image
            sx={{ width: '400px' }}
            src="/static/imgs/404.svg"
            alt="Not found"
          />
          Back to Home
        </Box>
      </Container>
    </PageWrapper>
  );
};

export default NotFound;

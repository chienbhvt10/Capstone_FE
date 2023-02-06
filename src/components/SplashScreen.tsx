import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

const SplashScreen = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        placeContent: 'center',
        bgcolor: 'background.paper',
        inset: 0,
        position: 'fixed',
        zIndex: 'modal',
      }}
    >
      <Box>
        <Typography
          gutterBottom
          variant="subtitle2"
          align="center"
          sx={{
            color: (theme) =>
              theme.palette.getContrastText(theme.palette.background.paper),
          }}
        >
          VSHIP
        </Typography>
        <Box
          sx={{
            width: {
              xs: 250,
              sm: 400,
            },
          }}
        >
          <LinearProgress />
        </Box>
      </Box>
    </Box>
  );
};

export default SplashScreen;

import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;
const smallDrawerWidth = 65;
const headerHeight = 65;

interface ContentBounderProps extends BoxProps {
  open?: boolean;
}

interface Props extends ContentBounderProps {
  children: React.ReactNode;
}

const ContentBounder = (props: Props) => {
  const { children, open } = props;
  return (
    <Box>
      <Bounder open={open}>{children}</Bounder>
    </Box>
  );
};

const Bounder = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open',
})<ContentBounderProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginTop: headerHeight,
  marginLeft: smallDrawerWidth,
  width: `calc(100% - ${smallDrawerWidth}px)`,
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default ContentBounder;

import { Box } from '@mui/material';
import React from 'react';
import ContentBounder from './components/ContentBounder';
import Header from './components/Header';
import SideBar from './components/SideBar';

interface Props {
  children: React.ReactNode;
}

const AdminLayout = (props: Props) => {
  const { children } = props;
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Header handleDrawerOpen={handleDrawerOpen} open={open} />
      <SideBar handleDrawerClose={handleDrawerClose} open={open} />
      <ContentBounder open={open}>{children}</ContentBounder>
    </Box>
  );
};

export default AdminLayout;

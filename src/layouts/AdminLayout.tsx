import { Box, Stack } from '@mui/material';
import React from 'react';
import Header from './components/Header';
import SideBar from './components/SideBar';
import ContentBounder from './components/ContentBounder';

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

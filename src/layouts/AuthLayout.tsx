import { Box } from '@mui/material';
import React from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <Box>
      <Header />
      <Outlet />
    </Box>
  );
};

export default AuthLayout;

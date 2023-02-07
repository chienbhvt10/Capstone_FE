import { Box } from '@mui/material';
import React from 'react';
import Header from './components/Header';

interface Props {
  children?: React.ReactNode;
}

const AuthLayout = (props: Props) => {
  const { children } = props;
  return (
    <Box>
      <Header />
      {children}
    </Box>
  );
};

export default AuthLayout;

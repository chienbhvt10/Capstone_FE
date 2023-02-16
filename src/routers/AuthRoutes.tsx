import Login from '../modules/Auth/Login';
import AuthLayout from '../layouts/AuthLayout';
import { RouteObject } from 'react-router-dom';

const authRoutes: RouteObject = {
  path: '/auth',
  element: <AuthLayout />,
  children: [
    {
      index: true,
      path: 'login',
      element: <Login />,
    },
  ],
};
export default authRoutes;

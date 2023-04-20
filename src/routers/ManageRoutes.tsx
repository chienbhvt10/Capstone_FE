import { Outlet, RouteObject } from 'react-router-dom';
import LecturerProfilePage from '~/modules/Lecturer/LecturerProfile';
import ManagePage from '~/modules/Manage';

const manageRoutes: RouteObject = {
  path: 'manage',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <ManagePage />,
    },
    {
      index: true,
      path: 'profile',
      element: <LecturerProfilePage />,
    },
  ],
};
export default manageRoutes;

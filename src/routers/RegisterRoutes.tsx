import { Outlet, RouteObject } from 'react-router-dom';
import AdminLayout from '~/layouts/AdminLayout';
import RegisterPage from '~/modules/Lecturer';
import ApproveLecturerRegister from '~/modules/Lecturer/ApproveLecturerRegister';
import LecturerRegisterEdit from '~/modules/Lecturer/LecturerRegisterEdit';

const registerRoutes: RouteObject = {
  path: 'register',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <RegisterPage />,
    },
    {
      path: 'edit',
      element: <LecturerRegisterEdit />,
    },
    {
      path: 'approve',
      element: <ApproveLecturerRegister />,
    },
  ],
};
export default registerRoutes;

import { RouteObject, useRoutes } from 'react-router-dom';
import ApproveLecturerRegister from '~/modules/Lecturer/ApproveLecturerRegister';
import LecturerProfilePage from '~/modules/Lecturer/LecturerProfile';
import LecturerRegisterEdit from '~/modules/Lecturer/LecturerRegisterEdit';
import AdminLayout from '../layouts/AdminLayout';
import AuthLayout from '../layouts/AuthLayout';
import ArrangePage from '../modules/Arrange';
import Login from '../modules/Auth/Login';
import RegisterPage from '../modules/Lecturer/LecturerRegister';
import ManagePage from '../modules/Manage';
import SettingPage from '../modules/Setting';
import TimeTablePage from '../modules/TimeTable';
import authRoutes from './AuthRoutes';

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <AdminLayout>
        <TimeTablePage />
      </AdminLayout>
    ),
  },
  {
    path: '/timetable',
    element: (
      <AdminLayout>
        <TimeTablePage />
      </AdminLayout>
    ),
  },
  {
    path: '/arrange',
    element: (
      <AdminLayout>
        <ArrangePage />
      </AdminLayout>
    ),
  },
  {
    path: '/settings',
    element: (
      <AdminLayout>
        <SettingPage />
      </AdminLayout>
    ),
  },
  {
    path: '/register',
    element: (
      <AdminLayout>
        <RegisterPage />
      </AdminLayout>
    ),
  },
  {
    path: '/register/edit',
    element: (
      <AdminLayout>
        <LecturerRegisterEdit />
      </AdminLayout>
    ),
  },
  {
    path: '/register/approve',
    element: (
      <AdminLayout>
        <ApproveLecturerRegister />
      </AdminLayout>
    ),
  },
  {
    path: '/profile',
    element: (
      <AdminLayout>
        <LecturerProfilePage />
      </AdminLayout>
    ),
  },
  {
    path: '/manage',
    element: (
      <AdminLayout>
        <ManagePage />
      </AdminLayout>
    ),
  },
  {
    path: '/login',
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
  authRoutes,
];

const Routers = () => {
  const element = useRoutes(routes);
  return element;
};

export default Routers;

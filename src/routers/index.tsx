import { RouteObject, useRoutes } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import ManagePage from '../modules/Manage';
import ArrangePage from '../modules/Arrange';
import SettingPage from '../modules/Setting';
import RegisterPage from '../modules/Register';
import TimeTablePage from '../modules/TimeTable';

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <AdminLayout>
        <ManagePage />
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
    path: '/manage',
    element: (
      <AdminLayout>
        <ManagePage />
      </AdminLayout>
    ),
  },
];

const Routers = () => {
  const element = useRoutes(routes);
  return element;
};

export default Routers;

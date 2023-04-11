import { RouteObject, useRoutes } from 'react-router-dom';
import ArrangePage from '~/modules/Arrange';
import NotFound from '~/modules/Errors/NotFound';
import AdminLayout from '../layouts/AdminLayout';
import AuthLayout from '../layouts/AuthLayout';
import arrangeRoutes from './ArrangeRoutes';
import authRoutes from './AuthRoutes';
import manageRoutes from './ManageRoutes';
import registerRoutes from './RegisterRoutes';
import settingRoutes from './SettingRoutes';
import timetableRoutes from './TimetableRoutes';
import semesterRouters from './SemesterRouter';

const routes: RouteObject[] = [
  authRoutes,
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <ArrangePage />,
      },
      arrangeRoutes,
      registerRoutes,
      settingRoutes,
      timetableRoutes,
      manageRoutes,
      semesterRouters,
    ],
  },
  {
    path: '*',
    element: <AuthLayout />,
    children: [
      { index: true, element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];

const Routers = () => {
  const element = useRoutes(routes);
  return element;
};

export default Routers;

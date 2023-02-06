import { RouteObject, useRoutes } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import HomePage from '../modules/Home';

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <AdminLayout>
        <HomePage />
      </AdminLayout>
    ),
  },
];

const Routers = () => {
  const element = useRoutes(routes);
  return element;
};

export default Routers;

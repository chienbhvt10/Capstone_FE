import { RouteObject, useRoutes } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';

const routes: RouteObject[] = [
  { path: '/', element: <AdminLayout>"AdminLayout"</AdminLayout> },
];

const Routers = () => {
  const element = useRoutes(routes);
  return element;
};

export default Routers;

import { Outlet, RouteObject } from 'react-router-dom';
import ArrangePage from '../modules/Arrange';

const arrangeRoutes: RouteObject = {
  path: 'arrange',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <ArrangePage />,
    },
  ],
};
export default arrangeRoutes;

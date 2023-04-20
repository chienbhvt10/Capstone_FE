import { Outlet, RouteObject } from 'react-router-dom';
import SemesterSetting from '~/modules/Semester';

const semesterRouters: RouteObject = {
  path: 'semester',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <SemesterSetting />,
    },
  ],
};
export default semesterRouters;

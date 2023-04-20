import { Outlet, RouteObject } from 'react-router-dom';
import TimeTablePage from '~/modules/TimeTable';

const timetableRoutes: RouteObject = {
  path: 'timetable',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <TimeTablePage />,
    },
  ],
};
export default timetableRoutes;

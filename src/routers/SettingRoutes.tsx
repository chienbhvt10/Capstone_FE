import { Outlet, RouteObject } from 'react-router-dom';
import LecturersSetting from '~/modules/Setting/Lecturers';
import PreferenceLevelSetting from '~/modules/Setting/PreferenceLevel';
import DistanceSettings from '~/modules/Setting/Rooms';
import SubjectsSetting from '~/modules/Setting/Subjects';
import TimeSlotsSetting from '~/modules/Setting/TimeSlots';

const settingRoutes: RouteObject = {
  path: 'settings',
  element: <Outlet />,
  children: [
    {
      index: true,
      path: 'lecturers',
      element: <LecturersSetting />,
    },
    {
      path: 'models',
      element: <TimeSlotsSetting />,
    },
    {
      path: 'subjects',
      element: <SubjectsSetting />,
    },
    {
      path: 'distance',
      element: <DistanceSettings />,
    },
    {
      path: 'preference-level',
      element: <PreferenceLevelSetting />,
    },
    {
      path: 'time-slot',
      element: <TimeSlotsSetting />,
    },
  ],
};
export default settingRoutes;

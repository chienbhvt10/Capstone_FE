import { Outlet, RouteObject } from 'react-router-dom';
import LecturersSetting from '~/modules/Setting/Lecturers';
import PreferenceLevelSetting from '~/modules/Setting/PreferenceLevel';
import RoomsSettings from '~/modules/Setting/Rooms';
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
      path: 'rooms',
      element: <RoomsSettings />,
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

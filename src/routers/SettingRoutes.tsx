import { Outlet, RouteObject } from 'react-router-dom';
import ModelSetting from '~/modules/Setting/Models';
import PreferenceLevelSetting from '~/modules/Setting/PreferenceLevel';
import RoomsSettings from '~/modules/Setting/Rooms';
import SubjectsSetting from '~/modules/Setting/Subjects';

const settingRoutes: RouteObject = {
  path: 'settings',
  element: <Outlet />,
  children: [
    {
      index: true,
      path: 'subjects',
      element: <SubjectsSetting />,
    },
    {
      path: 'models',
      element: <ModelSetting />,
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
      element: <PreferenceLevelSetting />,
    },
  ],
};
export default settingRoutes;

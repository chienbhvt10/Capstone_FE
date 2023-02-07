import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import Routers from './routers';
import { SettingsProvider } from './contexts/SettingTheme';
import { CssBaseline } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import history from './utils/history';
import { NotificationProvider } from './contexts/Notification';

const App = () => {
  return (
    <HelmetProvider>
      <HistoryRouter history={history}>
        <SettingsProvider>
          <NotificationProvider>
            <CssBaseline />
            <Routers />
          </NotificationProvider>
        </SettingsProvider>
      </HistoryRouter>
    </HelmetProvider>
  );
};

export default App;

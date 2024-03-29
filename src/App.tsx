import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import Routers from './routers';
import { SettingsProvider } from './contexts/SettingTheme';
import { CssBaseline } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import history from './utils/history';
import { NotificationProvider } from './contexts/Notification';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ArrangeProvider } from './contexts/Arrange';
import { AuthProvider } from './contexts/Auth';

const App = () => {
  return (
    <HelmetProvider>
      <HistoryRouter history={history}>
        <SettingsProvider>
          <NotificationProvider>
            <AuthProvider>
              <ArrangeProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <CssBaseline />
                  <Routers />
                </LocalizationProvider>
              </ArrangeProvider>
            </AuthProvider>
          </NotificationProvider>
        </SettingsProvider>
      </HistoryRouter>
    </HelmetProvider>
  );
};

export default App;

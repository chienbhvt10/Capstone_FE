import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import Routers from './routers';
import { SettingsProvider } from './contexts/SettingTheme';
import { CssBaseline } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import history from './utils/history';

const App = () => {
  return (
    <HelmetProvider>
      <HistoryRouter history={history}>
        <SettingsProvider>
          <CssBaseline />
          <Routers />
        </SettingsProvider>
      </HistoryRouter>
    </HelmetProvider>
  );
};

export default App;

import { BrowserRouter } from 'react-router-dom';
import Routers from './routers';
import { SettingsProvider } from './contexts/SettingTheme';
import { CssBaseline } from '@mui/material';
interface Props {}

const App = (props: Props) => {
  return (
    <BrowserRouter>
      <SettingsProvider>
        <CssBaseline />
        <Routers />
      </SettingsProvider>
    </BrowserRouter>
  );
};

export default App;

import { BrowserRouter } from 'react-router-dom';
import Routers from './routers';
import { SettingsProvider } from './contexts/SettingTheme';
interface Props {}

const App = (props: Props) => {
  return (
    <BrowserRouter>
      <SettingsProvider>
        <Routers />
      </SettingsProvider>
    </BrowserRouter>
  );
};

export default App;

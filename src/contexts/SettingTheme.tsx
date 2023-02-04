import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import createGlobalTheme from '../theme';
import LocalStorage from '../utils/LocalStorage';

export type Mode = 'light' | 'dark' | 'default';

interface Settings {
  direction: 'ltr' | 'rtl';
  mode: Mode;
}

export interface SettingsContextValue {
  settings: Settings;
  saveSettings: (settings: Settings) => void;
}

const initialSettings: Settings = {
  direction: 'ltr',
  mode: 'light',
};

export const SettingsContext = createContext<SettingsContextValue | null>(null);

if (process.env.NODE_ENV === 'development') {
  SettingsContext.displayName = 'SettingsContext';
}

const SettingsProvider: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const mode = useMediaQuery('(prefers-color-scheme: dark)');

  const preferredMode = mode ? 'dark' : 'light';

  useEffect(() => {
    const settings = LocalStorage.get('settings', initialSettings);

    if (
      typeof settings === 'object' &&
      Object.keys(settings).every((setting) => setting in initialSettings)
    ) {
      setSettings(settings);
    }
  }, []);

  const saveSettings = useCallback((settings: Settings): void => {
    setSettings(settings);
    LocalStorage.set('settings', settings);
  }, []);

  const theme = useMemo(() => {
    const { mode } = settings;
    return createGlobalTheme({
      ...settings,
      mode: mode === 'default' ? preferredMode : mode,
    });
  }, [settings, preferredMode]);

  return (
    <SettingsContext.Provider value={{ settings, saveSettings }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </SettingsContext.Provider>
  );
};

const SettingsConsumer = SettingsContext.Consumer;
export { SettingsContext as default, SettingsProvider, SettingsConsumer };

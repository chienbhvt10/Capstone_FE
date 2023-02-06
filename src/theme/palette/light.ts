import type { ThemeOptions } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { CapstoneAttributes } from 'theme';

const neutral = {
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',
  800: '#1F2937',
  900: '#111827',
};

const capstoneAttributes: CapstoneAttributes = {
  richTextEditor: {
    contentEditorBorder: '1px solid #000000',
    activeButton: '#D1D5DB',
  },
  background: {
    superLightBlue: '#F2F9FF',
    superLightBlue2: 'rgba(7, 158, 194, 0.21)',
    lightBlue: '#0D99FF',
    blue: '#0088FF',
    lightRed: '#ffe7e7',
    disabled: '#C5C5C5',
    gray: '#C5C5C5',
    red: '#ff0000',
  },
  color: {
    superLightBlue: 'rgba(7, 158, 194, 1)',
    blue: '#0088FF',
    red: '#ff0000',
    white: '#FFF',
    gray: '#C5C5C5',
  },
  borderColor: {
    superLightBlue: 'rgba(7, 158, 194, 1)',
    blue: '#0088FF',
    red: '#ff0000',
    gray: '#C5C5C5',
  },
  chip: {
    info: {
      backgroundColor: alpha('#64B6F7', 0.5),
    },
    warning: {
      backgroundColor: alpha('#FFBF4C', 0.5),
    },
    error: {
      backgroundColor: alpha('#DA6868', 0.5),
    },
  },
};

const background = {
  default: '#F5F5F5',
  paper: '#FFFFFF',
};

const primary = {
  main: '#0B9F7C',
  light: '#63E2AC',
  dark: '#05726D',
  contrastText: '#FFFFFF',
};

const secondary = {
  main: '#10B981',
  light: '#3FC79A',
  dark: '#0B815A',
  contrastText: '#FFFFFF',
};

const success = {
  main: '#088876',
  light: '#63E2AC',
  dark: '#05726D',
  contrastText: '#FFFFFF',
};

const info = {
  main: '#2196F3',
  light: '#64B6F7',
  dark: '#0B79D0',
  contrastText: '#FFFFFF',
};

const warning = {
  main: '#FFB020',
  light: '#FFBF4C',
  dark: '#B27B16',
  contrastText: '#FFFFFF',
};

const error = {
  main: '#D14343',
  light: '#DA6868',
  dark: '#922E2E',
  contrastText: '#FFFFFF',
};

const text = {
  primary: '#121828',
  secondary: '#65748B',
  disabled: '#121828',
};

const divider = '#E6E8F0';

const light: ThemeOptions = {
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: neutral[500],
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            opacity: 0.75,
            color: text.secondary,
            fontWeight: 400,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: divider,
        },
        root: {
          '&.Mui-disabled': {
            backgroundColor: neutral[100],
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: neutral[500],
        },
        track: {
          backgroundColor: neutral[400],
          opacity: 1,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: neutral[200],
          '.MuiTableCell-root': {
            color: neutral[700],
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${divider}`,
        },
      },
    },
  },
  palette: {
    mode: 'light',
    background,
    divider,
    error,
    info,
    neutral,
    primary,
    secondary,
    success,
    text,
    warning,
    capstoneAttributes,
  },
  shadows: [
    'none',
    '0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)',
    '0px 1px 2px rgba(100, 116, 139, 0.12)',
    '0px 1px 4px rgba(100, 116, 139, 0.12)',
    '0px 1px 5px rgba(100, 116, 139, 0.12)',
    '0px 1px 6px rgba(100, 116, 139, 0.12)',
    '0px 2px 6px rgba(100, 116, 139, 0.12)',
    '0px 3px 6px rgba(100, 116, 139, 0.12)',
    '0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)',
    '0px 5px 12px rgba(100, 116, 139, 0.12)',
    '0px 5px 14px rgba(100, 116, 139, 0.12)',
    '0px 5px 15px rgba(100, 116, 139, 0.12)',
    '0px 6px 15px rgba(100, 116, 139, 0.12)',
    '0px 7px 15px rgba(100, 116, 139, 0.12)',
    '0px 8px 15px rgba(100, 116, 139, 0.12)',
    '0px 9px 15px rgba(100, 116, 139, 0.12)',
    '0px 10px 15px rgba(100, 116, 139, 0.12)',
    '0px 12px 22px -8px rgba(100, 116, 139, 0.25)',
    '0px 13px 22px -8px rgba(100, 116, 139, 0.25)',
    '0px 14px 24px -8px rgba(100, 116, 139, 0.25)',
    '0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
  ],
};

export default light;

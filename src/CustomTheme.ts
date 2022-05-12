import { createTheme } from '@material-ui/core/styles';
import { defaultTheme } from 'react-admin';

const customTheme = createTheme({
  ...defaultTheme,
  ...{
    palette: {
      secondary: {
        main: '#fff',
      },
    },
    MuiTableRow: {
      root: {
        height: 40,
      },
    },
  },
});

export default customTheme;

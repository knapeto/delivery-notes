import { darkTheme, lightTheme } from './libs/themes';

import { AppState } from './reducers';
import CustomAppBar from './CustomAppBar';
import { Layout } from 'react-admin';
import { useSelector } from 'react-redux';

const CustomLayout = (props) => {
  const theme = useSelector((state: AppState) =>
    state.theme === 'dark' ? darkTheme : lightTheme,
  );
  return <Layout {...props} appBar={CustomAppBar} theme={theme} />;
};

export default CustomLayout;

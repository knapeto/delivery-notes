import { useDispatch, useSelector } from 'react-redux';

import { AppState } from './reducers';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Button from '@material-ui/core/Button';
import { changeTheme } from './reducers/theme';

const ThemeSwitcher = () => {
  const theme = useSelector((state: AppState) => state.theme);
  const dispatch = useDispatch();

  const onChange = (value) => {
    localStorage.setItem('theme', value);
    dispatch(changeTheme(value));
  };

  return (
    <div>
      {theme === 'light' && (
        <Button onClick={() => onChange('dark')}>
          <Brightness3Icon />
        </Button>
      )}
      {theme === 'dark' && (
        <Button onClick={() => onChange('light')}>
          <Brightness7Icon />
        </Button>
      )}
    </div>
  );
};

export default ThemeSwitcher;

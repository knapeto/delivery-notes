import { ReduxState } from 'react-admin';
import { ThemeName } from './theme';

export interface AppState extends ReduxState {
  theme: ThemeName;
}

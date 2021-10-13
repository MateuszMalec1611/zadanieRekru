import { useContext } from 'react';
import { AppContext } from 'src/store/App/App.context';

export const useApp = () => useContext(AppContext);

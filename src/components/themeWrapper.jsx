import React, { useContext } from 'react';
import { ThemeContext } from './common/theme';

const ThemeWrapper = ({ children }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={darkMode ? 'dark' : 'light'}>
      {children}
    </div>
  );
};

export default ThemeWrapper;

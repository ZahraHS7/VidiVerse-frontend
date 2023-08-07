import React, { useContext } from 'react';
import { ThemeContext } from './theme';
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri'; // Import the React Icons Remix

export default function NightmodeButton() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <div>
      {darkMode ? (
        <RiMoonClearFill
          size="1.6em"
          onClick={toggleDarkMode}
          className="mr-1 ml-2 self-left justify-self-end cursor-pointer"
        />
      ) : (
        <RiSunFill
          size="1.6em"
          onClick={toggleDarkMode}
          className="mr-1 ml-2 self-left justify-self-end cursor-pointer"
        />
      )}
    </div>
  );
}

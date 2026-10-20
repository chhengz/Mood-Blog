import React, { useContext } from 'react'
import { AppContext } from '../../contexts/AppContext'
import { Moon, Sun } from 'lucide-react';

const ToggleThemeButton = ({isScrolled = false}) => {
    const { theme, toggleTheme } = useContext(AppContext);

    const handleToggle = () => {
        toggleTheme();
    }

    return (
  
      <button
        onClick={handleToggle}
        className={`w-10 h-10 px-2 py-2  bg-zinc-400/50  ${isScrolled ? '' : ' '} border border-gray-600 backdrop-blur-lg rounded-full cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out`}
      >
        {theme === 'light' ? (
          <span>
            <Moon className='w-full h-full' />
          </span>
        ) : (
          <span>
            <Sun className='w-full h-full' />
          </span>
        )}
      </button>

    )
}

export default ToggleThemeButton
import React, { createContext, useContext, useEffect, useState } from 'react'
import ProfileAvatar from '../profile/ProfileAvatar'
import Navbar from '../navbar/Navbar'
import { useNavigate } from 'react-router'
import { AppContext } from '../../contexts/AppContext'
import { House } from 'lucide-react'

const Header = () => {
    const {  user, isAuthenticated } = useContext(AppContext);

    const navigate = useNavigate();

    // handle scroll to change header style
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                // console.log(window.scrollY);
                setIsScrolled(true);
            } else {
                // console.log(window.scrollY);
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

  return (
    <div className={`w-full sticky top-5 flex justify-between items-center 
        ${ isScrolled 
        ? 'border border-gray-600 backdrop-blur-lg rounded-full shadow-md' 
        : 'bg-transparent border-transparent' } 
        transition-all duration-300`}>

        
        <div
        onClick={() => navigate('/home')}
        className={` 
            ${isAuthenticated ? 'hidden md:block' : ''} 
            ${ isAuthenticated && isScrolled ? 'ml-4 ' : 'px-2'}
            ${isScrolled ? 'ml-2 p-0 ' : 'px-2 py-2 border border-gray-600 backdrop-blur-lg rounded-full'} 
            cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out`}>
            <h1 className='text-md font-bold'>
                <House />
            </h1>
        </div>

        
        {/* <div className={`p-1 md:pl-4
            ${isAuthenticated ? 'md:pr-4' : 'pl-3'} 
            ${isScrolled ? '' : 'md:border border-gray-600 backdrop-blur-lg rounded-full'} `}>
            <Navbar />
        </div> */}

       

        {/* <ProfileAvatar /> */}
            
      </div>
  )
}

export default Header

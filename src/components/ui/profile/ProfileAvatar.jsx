import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { AppContext } from "../../contexts/AppContext";
import { LogOut, Settings, UserRoundCog } from "lucide-react";

const AVATAR_URL =
  "https://static.vecteezy.com/system/resources/previews/027/951/137/non_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png";

const links = [
  {
    label: "Profile",
    path: "/profile",
    icon: <UserRoundCog className="w-full h-full" />,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: <Settings className="w-full h-full" />,
  },
];

const ProfileAvatar = ({isScrolled = false}) => {
  const { user, logout } = useContext(AppContext);

  const menuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        title={user?.username || ''}
        className={`rounded-full w-10 h-10 overflow-hidden  ${isScrolled ? '' :  '' } border border-gray-600 cursor-pointer  hover:scale-105 transition-transform duration-200 ease-in-out`}
      >
        {/* <img
          src={user. AVATAR_URL}
          alt="Profile Avatar"
          className="object-cover w-full h-full"
        /> */}
        <div className={`w-full h-full grid place-items-center  bg-zinc-400/50 `}>
          <p className="font-bold text-2xl ">
            {
              user?.username[0].toUpperCase() || '' /* Display first letter of username as avatar */
            }
          </p>
        </div>
      </div>

      {/* Dropdown links under avatar profile */}
      <nav
        ref={menuRef}
        className="relative space-y-1 transition-all ease-linear duration-300"
      >
        {isOpen && (
          <ul className="absolute space-y-1 z-10 right-0 mt-2 w-48 p-2 dark:bg-zinc-800 border  border-(--border-color)/90 overflow-hidden rounded-xl shadow-lg ">
            {links.map((link) => (
              <li key={link.label} className="hover:bg-(--border-color)/60 rounded-md transition-all duration-150">
                <Link
                  to={link.path}
                  className="group flex group items-center justify-start w-full px-2 py-1 font-bold dark:text-(--text-gray) dark:hover:text-white  transition-all duration-150 rounded-lg"
                >
                  {/* Icon */}
                  <div className="mr-2 w-5 h-5  transition-all duration-150 ease-in-out ">
                    {link.icon}
                  </div>
                  <span className="transition-all duration-150 ease-in-out">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}

            <li className="hover:bg-(--border-color)/60 rounded-md transition-all duration-150">
              <button
                onClick={handleLogout}
                className="group flex items-center justify-start w-full px-2 py-1 font-bold dark:text-(--text-gray) dark:hover:text-red-400 rounded-lg transition-all duration-150 cursor-pointer"
              >
                {/* Icon */}
                <div className="mr-2 w-5 h-5  transition-all duration-150 ease-in-out ">
                  <LogOut className="w-full h-full" />
                </div>

                {/* Text */}
                <span className="transition-all duration-150 ease-in-out ">
                  Logout
                </span>
              </button>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default ProfileAvatar;

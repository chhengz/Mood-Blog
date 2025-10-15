import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AppContext } from "../../contexts/AppContext";
import { Menu, Minimize2, X, House, Pilcrow, ContactRound } from "lucide-react";
import ProfileAvatar from "../profile/ProfileAvatar";
import ToggleThemeButton from "../button/ToggleThemeButton";

const links = [
  { label: "Home", path: "/home", icon: <House /> },
  { label: "Posts", path: "/blog", icon: <Pilcrow /> },
  { label: "About", path: "/about", icon: <ContactRound /> },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  // const [showLoginForm, setShowLoginForm] = useState(false);
  const { isAuthenticated, toggleTheme, theme } = useContext(AppContext);

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
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    // <nav className="hidden xl:block">
    <>
      <div className=" fixed left-0 top-5 w-full px-6 md:px-8 z-50">
        <div
          className={`container mx-auto md:max-w-3/4 lg:max-w-2/4  ${
            isAuthenticated
              ? "flex justify-between md:grid md:grid-cols-3"
              : "flex justify-between items-center"
          } 
          ${
            isScrolled
              ? " p-2  border border-gray-600/50 backdrop-blur-lg rounded-full shadow-md"
              : "bg-transparent border-transparent"
          } 
        transition-all duration-300`}
        >
          <div
            onClick={() => navigate("/home")}
            // ${ isAuthenticated ? "" : ""}
            className={`hidden md:block p-2 bg-zinc-800/50  ${
              isScrolled ? "" : "border border-gray-600 backdrop-blur-lg"
            } justify-self-start rounded-full cursor-pointer  hover:scale-105 transition-transform duration-200 ease-in-out`}
          >
            <h1 className="text-md font-bold">
              <House />
            </h1>
          </div>

          {/* {isAuthenticated ? ( */}
          <div className=" flex md:hidden items-center justify-center border border-gray-600 backdrop-blur-lg rounded-full hover:scale-105 transition-transform duration-200 ease-in-out">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 w-10 h-10 bg-transparent cursor-pointer"
            >
              <Menu className="w-full h-full" />
            </button>
          </div>
          {/* // ) : null } */}
          <div className="flex items-center justify-center">
            {/* ${isScrolled ? '' : 'border border-gray-600 backdrop-blur-lg rounded-full'} */}
            {/* <div className={`p-1 md:pl-4 ${isAuthenticated ? 'md:pr-4' : ''}  `}> */}
            <nav
              className={` ${
                isAuthenticated
                  ? "hidden md:block md:px-4 w-fit justify-self-center"
                  : "md:pl-3 justify-center"
              } flex items-center 
              ${isScrolled ? "p-0 md:pr-0" : "backdrop-blur-lg rounded-full"}
              transition-all duration-150 ease-in-out `}
            >
              <ul className="flex space-x-4 justify-center items-center">
                {links.map((link) => (
                  <li
                    key={link.label}
                    className={`${isAuthenticated ? "" : "hidden md:block"}`}
                  >
                    <NavLink
                      to={link.path}
                      className={`text-lg md:text-xl font-medium text-[var(--text-black)] dark:text-[var(--text-gray)] hover:not-[.active]:text-[var(--text-color)] transition-all duration-150 ease-in-out `}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}

                {isAuthenticated ? null : (
                  <li
                    className={`w-fit ${
                      isScrolled
                        ? "p-1 border border-gray-600 backdrop-blur-lg"
                        : "m-1"
                    } rounded-full `}
                  >
                    <button
                      onClick={() => navigate("/login")}
                      className={`  cursor-pointer block px-3  py-1 text-md font-medium  text-[var(--text-color)] bg-blue-400 rounded-full  hover:scale-105 transition-transform duration-200 ease-in-out `}
                    >
                      Login
                    </button>
                  </li>
                )}
              </ul>

              {!isAuthenticated && (
                <div className="ml-2">
                  <ToggleThemeButton isScrolled={isScrolled} />
                </div>
              )}
            </nav>

            {/* </div> */}
          </div>

          {isAuthenticated && (
            <div className="flex gap-2 items-center justify-center justify-self-end">
              {/* Button switch theme */}
              <ToggleThemeButton isScrolled={isScrolled} />

              {/* Profile Avatar */}
              <ProfileAvatar isScrolled={isScrolled} />
            </div>
          )}
        </div>
      </div>

      {/* show navbar menu */}
      {isOpen ? (
        <div
          className={`block md:hidden fixed top-0 left-0 z-50 w-full h-full bg-black/50 backdrop-blur-lg transition-all duration-300 ease-in-out `}
        >
          <nav className="  fixed  w-full h-full flex flex-col items-center justify-center ">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className={`absolute ${
                isScrolled ? "top-7 left-8" : "top-5 left-6"
              }  border border-gray-600 rounded-full p-2 hover:scale-105 transition cursor-pointer`}
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Links */}
            <ul className="space-y-6  ">
              {links.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={"group flex items-center justify-start"}
                  >
                    <div className="mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 ease-in-out">
                      {link.icon}
                    </div>
                    <span className="active__navlink text-2xl font-bold text-[var(--text-gray)] group-hover:text-[var(--text-color)] -translate-x-2 group-hover:translate-x-0 transition-all duration-200 ease-in-out">
                      {link.label}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}

      {/* Show Dialog LoginForm */}
      {/* {showLoginForm && (
        <div>
          <h1>Login Form</h1>
        </div>
      )} */}
    </>
  );
};

export default Navbar;

{
  /* <Link to={'/login'} className="block px-3 py-1 text-md font-medium  text-[var(--text-color)] bg-blue-400 rounded-full  hover:scale-105 transition-transform duration-200 ease-in-out ">
                  Login
                </Link> */
}

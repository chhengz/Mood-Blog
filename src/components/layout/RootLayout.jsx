import React from "react";
import { Outlet } from "react-router";
import Navbar from "../ui/navbar/Navbar";
import Header from "../ui/header/Header";
import ScrollToTop from "../ui/ScrollToTop";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const RootLayout = () => {

  const { theme } = useContext(AppContext)


  return (
    <>
      <ScrollToTop />
      
        <div className={`  `  }>
          <div className=" relative container  md:max-w-3/4 lg:max-w-2/4 mx-auto min-h-screen flex flex-col p-8 flex-grow">
        <Navbar />

        <div className="mt-6 sm:px-8 md:mt-12">
          <Outlet />
        </div>

        
      </div>
        </div>

    </>
  );
};

export default RootLayout;

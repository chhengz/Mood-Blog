import React from "react";
import { Outlet } from "react-router";
import Navbar from "../ui/navbar/Navbar";
import Header from "../ui/header/Header";
import ScrollToTop from "../ui/ScrollToTop";

const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      
        <div className=" relative container md:max-w-3/4 lg:max-w-2/4 mx-auto min-h-screen flex flex-col p-8 flex-grow">
        <Navbar />

        <div className="mt-6 sm:px-6 md:mt-8">
          <Outlet />
        </div>
      </div>

    </>
  );
};

export default RootLayout;

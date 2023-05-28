import React from "react";
import Image from "next/image";
import { BsFillSunFill, BsMoonStarsFill } from "react-icons/bs";

// local imports
import Logo from "../public/Favicon/logo.ico";

const Header = () => {
  let currentUrl;
  if (typeof window !== "undefined") {
    currentUrl = window.location.href;
  }
  const logout = () => {
    console.log("logout is hit");
    localStorage.clear();
    // router.push('/');
    window.location.reload();
  };
  return (
    <div className="border-b border-[#FEFD32] w-full h-[15vh] flex justify-between items-center px-[5%] mb-4">
      <Image
        src={Logo}
        alt="logo"
        className="min-w-[6%] h-full cursor-pointer object-contain"
      />
      {currentUrl === "/" ? (
        <>
          <BsMoonStarsFill className="text-xl cursor-pointer object-contain" />
        </>
      ) : (
        <>
          <button onClick={logout} className="bg-green-500 bg-opacity-50 rounded-lg p-2">Logout</button>
        </>
      )}
    </div>
  );
};

export default Header;

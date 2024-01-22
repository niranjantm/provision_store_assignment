import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "./Context";
import SignIn from "../Pages/SignIn";



function Private() {
  const { user,setUser } = useContext(LoginContext);
  const handleSignOut = ()=>{
        setUser("")
  }
  return (
    <div className="w-full">
      {user? (
        <div className="w-full max-md:w-fit">
            <header className="h-[100px] customColor flex justify-between items-center shadow-lg shadow-gray-500 ">
                <img src="http://www.hindigraphics.in/wp-content/uploads/2019/01/pro.png" className="max-w-[150px]"></img>
                
                <div className="flex gap-3 px-5">
                <NavLink to="/products" className={({isActive})=>{
                    return isActive?"text-red-600 text-xl font-medium"
                    : "text-xl font-medium ";
                }}>Products</NavLink>
                <NavLink to="/about" className={({isActive})=>{
                    return isActive?"text-red-600 text-xl font-medium "
                    : "text-xl font-medium ";
                }}>About</NavLink>
                <button type="button" onClick={handleSignOut} className=" text-xl font-medium ">Sign Out</button>
                </div>
            </header>
          <Outlet></Outlet>
        </div>
      ) : (
        <SignIn></SignIn>
      )}
    </div>
  );
}

export default Private;

import React from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import Logoutbtn from "./Logoutbtn";

function Navbar() {
  const crossMenu = useRef();
  const showNav = useRef();
  const navigate = useNavigate()

  const handleToggle = () => {
    crossMenu.current.classList.toggle("active");
    showNav.current.classList.toggle("active");
  };

  const authStatus = useSelector((state) => state.auth.status);



  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "SignUp",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-post",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <div className="navbar">
      <div className="logo"><a href="/">ManageX</a></div>
      <div className="menu" ref={crossMenu} onClick={handleToggle}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className="nav-item" ref={showNav}>
        {navItems.map((item) =>
          item.active ? (
             <li  className="item cursor-pointer" key={item.name}>
            <button
                onClick={() => navigate(item.slug)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
            </li> 
          ) : null
        )}
        {authStatus && (<li className="item"><Logoutbtn /></li>)}
      </ul>
    </div>
  );
}

export default Navbar;

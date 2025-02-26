import React from "react";
import { Link} from "react-router-dom";
import { useSelector } from "react-redux";
import { Navbar } from "flowbite-react";
import Logoutbtn from "./Logoutbtn";

function CustomNavbar() {
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "SignUp", slug: "/signup", active: !authStatus },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "All Posts", slug: "/all-post", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <div className="w-full md:px-8 py-4">
    <Navbar fluid rounded className="bg-slate-200 py-6 px-7">
      <Navbar.Brand as={Link} to="/">
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Logo" /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          ManageX
        </span>
      </Navbar.Brand>

      {/* Hamburger Menu Toggle */}
      <Navbar.Toggle />

      {/* Navigation Links */}
      <Navbar.Collapse>
        {navItems.map(
          (item) =>
            item.active && (
              <Navbar.Link key={item.name} as={Link} to={item.slug} className="text-base">
                {item.name}
              </Navbar.Link>
            )
        )}
        {authStatus && (
          <Navbar.Link>
            <Logoutbtn />
          </Navbar.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
}

export default CustomNavbar;

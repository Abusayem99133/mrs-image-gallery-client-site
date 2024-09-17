import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Authentication/Provider/AuthProvider";

const Navbar = () => {
  const navItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link>Contact</Link>
      </li>
      <li>
        <Link>About</Link>
      </li>
    </>
  );
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState("light");
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);
  return (
    <div>
      <div className="navbar bg-cyan-200">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-52 p-2 shadow"
            >
              {navItems}
              <div className="sm:block lg:hidden ">
                <div className="form-control w-52">
                  <label className="cursor-pointer label">
                    <span className="label-text"></span>
                    <input
                      type="checkbox"
                      className="toggle toggle-secondary "
                      onChange={handleToggle}
                    />
                  </label>
                </div>
              </div>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">MRS Gallery</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end">
          <div className="hidden lg:block ">
            <div className="form-control w-52">
              <label className="cursor-pointer label">
                <span className="label-text"></span>
                <input
                  type="checkbox"
                  className="toggle toggle-secondary "
                  onChange={handleToggle}
                />
              </label>
            </div>
          </div>
          {user?.email ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10">
                  <img
                    className="rounded-full"
                    alt="user photo"
                    src={
                      user?.photoURL ||
                      "https://uploadimage.org/images/IAocu.jpeg"
                    }
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <button className="btn btn-sm btn-ghost">
                    {user?.displayName || "User Name not found"}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => logOut()}
                    className="btn btn-sm btn-ghost"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <button className=" border-2 border-sky-500 py-2 px-4 hover:bg-sky-500 rounded-md  mr-4">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

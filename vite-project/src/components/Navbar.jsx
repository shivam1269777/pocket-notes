import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/ContextProvider";
const Navbar = ({setQuery}) => {
  const [menuOpen, setMenuOpen] = useState(false);
const {user,logout}=useAuth()
  return (
    <nav className="bg-gray-800 text-white p-4 flex flex-wrap items-center justify-between">
      {/* Logo */}
      <div className="text-xl font-bold">
        <Link to="/">NoteAPP</Link>
      </div>

      {/* Search bar (center) */}
      <div className="flex-1 mx-4 order-2 md:order-2 w-full md:w-auto">
        <input
          type="text"
          placeholder="Search notes..."
          className="w-full md:w-64 px-4 py-2 rounded mx-auto block bg-gray-600"
          onChange={(e)=>{setQuery(e.target.value)}}
        />
      </div>

      {/* Hamburger button for mobile */}
      <div className="md:hidden order-3 md:order-3">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* User links */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } w-full md:flex md:items-center md:w-auto mt-2 md:mt-0 order-4 md:order-3`}
      >
        <div className="flex flex-col  md:flex-row md:items-center text-center">
          
          {!user?<><Link
            to="/login"
            className="bg-blue-500 px-4 py-2 rounded mb-2 md:mb-0 md:mr-2"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-500 px-4 py-2 rounded mb-2 md:mb-0 md:mr-2"
          >
            Signup
          </Link></>:
         <>
         <span className="mr-0 md:mr-4 mb-2 md:mb-0">{user.name}</span>
         <button className="bg-red-500 px-4 py-2 rounded" onClick={logout}>Logout</button></> }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

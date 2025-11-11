import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';




//   const navigate = useNavigate();
  const links = (
    <>
      <li className="text-lg font-medium">
        <NavLink
          to="/"
          style={({ isActive }) => {
            return {
              fontWeight: isActive ? "semibold" : "",
              color: isActive ? "#009999" : "#006666"
            };
          }}
        >
          Home
        </NavLink>
      </li>
      <li className="text-lg font-medium">
        <NavLink
          to="/about"
          style={({ isActive }) => {
            return {
              fontWeight: isActive ? "semibold" : "",
              color: isActive ? "#009999" : "#006666"
            };
          }}
        >
          About Us
        </NavLink>
      </li>
       <li className="text-lg font-medium">
        <NavLink
          to="/blogs"
          style={({ isActive }) => {
            return {
            fontWeight: isActive ? "semibold" : "",
              color: isActive ? "#009999" : "#006666"
            };
          }}
        >
         Blogs
        </NavLink>
      </li>
    </>
  );
export default function Navbar() {
  return (
    <div className="navbar bg-base-200 ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <a href="/" className="font-bold text-2xl"><span className='text-[#006666]'>Career</span><span className='text-[#009999]'>Craft</span></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end ">
    <a href="/login" className="btn mr-1 text-[#006666] font-semibold text-lg border-0 rounded-md">Log In</a> 
    <a href="/signup" className="btn  text-[#006666] font-semibold text-lg border-0 rounded-md">Sign Up</a> 
  </div>
</div>
  )
}

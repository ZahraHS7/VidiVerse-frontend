import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from 'react-router-dom';
import { BsPersonCircle} from 'react-icons/bs';
import NightmodeButton from "./common/nightmodeButton";
import * as Pics from '../pics';

const NavBar = ({ user }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDropdownClose = () => {
    setShowDropdown(false);
  };

  // Add event listener to detect clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="p-3 mb-3">
      <div className="d-flex flex-wrap justify-content-between align-items-center justify-content-lg-start">
        <Link className="d-flex align-items-center mb-2 mb-lg-0  text-decoration-none" to="/">
          <img src={Pics.logo} alt="logo vidiverse" style={{width: '50px', height: '50px'}} />
        </Link>

        <div className="nav col-lg-auto ml-5 mb-2 justify-content-center mb-md-0">
          <NavLink className="nav-link px-2 " to="/movies">
            Movies
          </NavLink>
          <NavLink className="nav-link px-2 " to="/customers">
            Customers
          </NavLink>
          <NavLink className="nav-link px-2 " to="/rentals">
            Rentals
          </NavLink>
        </div>

        <div className="ml-auto d-flex align-items-center">
          {!user && (
            <React.Fragment>
              <div className="d-flex">
                <NavLink className="nav-link mr-1 px-3 py-1 btn btn-primary rounded-pill login" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-link px-2 py-1 register" to="/register">
                  Register
                </NavLink>
              </div>
            </React.Fragment>
          )}
          {user && (
            <div className="position-relative" ref={dropdownRef}>
              <BsPersonCircle size={24} onClick={handleDropdownToggle} className="cursor-pointer mr-3" />
              {showDropdown && (
                <ul className="dropdown-menu show">
                  <NavLink className="dropdown-item" to="/profile" onClick={handleDropdownClose}>{user.name}</NavLink>
                  <li><hr className="dropdown-divider" /></li>
                  <NavLink className="dropdown-item" to="/logout" onClick={handleDropdownClose}>Logout</NavLink>
                </ul>
              )}
            </div>
          )}
          <NightmodeButton />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {BsTwitter, BsInstagram, BsFacebook } from 'react-icons/bs';
import * as Pics from '../pics';


class Footer extends Component {
  render() {
    return (
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 mb-0 mt-3">
        <p className="col-md-4 mb-0 px-3 small">© 2023 VidiVerse. All rights reserved.</p>

        <div className="col-md-4 d-flex justify-content-center">
          <Link className="d-flex align-items-center mb-2 mb-lg-0 text-decoration-none" to="/">
          <img src={Pics.logo} alt="logo vidiverse" style={{width: '50px', height: '50px'}} />
          </Link>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3 mr-3">
            <NavLink  to="/">
              <BsTwitter size={24} />
            </NavLink>
          </li>
          <li className="ms-3 mr-3">
            <NavLink  to="/">
              <BsInstagram size={24} />
            </NavLink>
          </li>
          <li className="ms-3 mr-3">
            <NavLink  to="/">
              <BsFacebook size={24} />
            </NavLink>
          </li>
        </ul>
      </footer>
    );
  }
}

export default Footer;

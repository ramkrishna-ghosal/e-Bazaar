import React from 'react';
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar" data-color="purple" data-background-color="white" data-image="../img/sidebar-2.jpg">
   
    <div className="logo">
      <a href="/" className="simple-text logo-normal">
        E-Commerce
      </a>
    </div>
    <div className="sidebar-wrapper">
      <ul className="nav">
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" exact to="/">
          {/* <a className="nav-link" href="./dashboard.html"> */}
            <i className="material-icons">dashboard</i>
            <p>Dashboard</p>
          {/* </a> */}
          </NavLink>
        </li>
        <li className="nav-item ">
          <NavLink className="nav-link" activeClassName="active" to="/category">
          {/* <a className="nav-link" href="./user.html"> */}
            <i className="material-icons">person</i>
            <p>Categories</p>
          {/* </a> */}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to="/product/all" >
          {/* <a className="nav-link" href="./tables.html"> */}
            <i className="material-icons">content_paste</i>
            <p>Products</p>
          </NavLink>
        </li>
        {/*<li className="nav-item ">
          <a className="nav-link" href="./typography.html">
            <i className="material-icons">library_books</i>
            <p>Typography</p>
          </a>
        </li>
        <li className="nav-item ">
          <a className="nav-link" href="./icons.html">
            <i className="material-icons">bubble_chart</i>
            <p>Icons</p>
          </a>
        </li>
        <li className="nav-item ">
          <a className="nav-link" href="./map.html">
            <i className="material-icons">location_ons</i>
            <p>Maps</p>
          </a>
        </li>
        <li className="nav-item ">
          <a className="nav-link" href="./notifications.html">
            <i className="material-icons">notifications</i>
            <p>Notifications</p>
          </a>
        </li>
        <li className="nav-item ">
          <a className="nav-link" href="./rtl.html">
            <i className="material-icons">language</i>
            <p>RTL Support</p>
          </a>
        </li>
        <li className="nav-item active-pro ">
          <a className="nav-link" href="./upgrade.html">
            <i className="material-icons">unarchive</i>
            <p>Upgrade to PRO</p>
          </a>
  </li> */}
      </ul>
    </div>
  </div>
  );
}

export default Sidebar;

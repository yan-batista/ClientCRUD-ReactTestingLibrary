import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./index.css";
import "./GlobalStyles.css";

export default function Header() {
  return (
    <>
      <header className="headerBar flex-row">
        <div className="logo flex-row">
          <span>EVY</span>
        </div>
        <nav className="navbar flex-row">
          <li>
            {" "}
            <NavLink end to="/">
              Home
            </NavLink>{" "}
          </li>
          <li>
            {" "}
            <NavLink to="/clientes">Clientes</NavLink>{" "}
          </li>
          <li>
            {" "}
            <NavLink to="/sobre" className="disabled">
              Sobre
            </NavLink>{" "}
          </li>
        </nav>
      </header>

      <Outlet />
    </>
  );
}

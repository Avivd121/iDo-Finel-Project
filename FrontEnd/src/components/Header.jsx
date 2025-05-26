import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/img/logo.png";

function Header() {
  const links = [
    { name: "Home", path: "/main" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Packages", path: "/packages" },
  ];

  return (
    <header>
      <div className="container">
        <div className="header__wrap">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
              <span className="slogan">iDo </span>
            </Link>
          </div>
          <nav>
            <ul className="menu">
              {links.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive ? "menu-item active" : "menu-item"
                    }
                    end={link.path === "/main"} // apply 'end' only on Home
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

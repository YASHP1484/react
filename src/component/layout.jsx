import React from "react";
import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const Layout = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active">
                  App
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/logIn" className="nav-link">
                  logIn
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/form" className="nav-link">
                  Form
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/component1" className="nav-link">
                  componenent1
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/grandParent" className="nav-link">
                  grandParent
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/voting" className="nav-link">
                  Voting
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/counter" className="nav-link">
                  counter
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;

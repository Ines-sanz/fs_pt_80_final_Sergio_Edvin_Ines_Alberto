import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
  const [isTransparent, setIsTransparent] = useState(false);
  let lastScrollTop = 0;

  const handleScroll = () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScrollTop) {
      setIsTransparent(true);
    } else {
      setIsTransparent(false);
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg my-navbar py-3 px-lg-3 px-0 sticky-top ${isTransparent ? "transparent" : ""}`}>
      <div className="container-fluid">
        <div className="col-2 text-center">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dr0wlij0c/image/upload/c_thumb,w_200,g_face/v1736453861/web-illustrations/logo.png"
              className="img-fluid"
              alt=""
            />
          </Link>
        </div>
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

        <div className="collapse navbar-collapse me-4" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-5 d-flex justify-content-between align-items-center">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle float"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                STORE
              </a>
              <ul className="dropdown-menu my-dropdown">
                <li>
                  <Link to="/store" className="dropdown-item">
                      Ver todo
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Consolas
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Videojuegos
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Accesorios
                  </a>
                </li>
              </ul>
            </li>

            <div className="d-flex align-items-center">
              <li className="nav-item">
                <Link to="/contacto" className="nav-link float" aria-current="page">
                    CONTACTO
                </Link>
              </li>
              <li className="nav-item ms-3">
                <Link to="/perfil" className="my-navbar-button px-3 float">
                  PERFIL
                </Link>
              </li>
              <li className="nav-item nav-link float" aria-current="page">
                  <img
                    src="https://res.cloudinary.com/dr0wlij0c/image/upload/v1736453861/web-illustrations/shopping-bag-icon.png"
                    className="img-fluid nav-shopping-bag"
                    alt=""
                  />
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};
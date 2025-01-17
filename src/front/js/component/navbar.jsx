import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const handleLink = (type) => {
    if (type === "all") {
      navigate("/store");
    } else {
      navigate(`/store/${type}`);
    }
  };

  return (
    <>
      <div
        className={`offcanvas offcanvas-end ${isTransparent ? "transparent" : ""}`}
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header my-offcanvas">
          
      
        </div>
        <div className="offcanvas-body my-offcanvas">
          <ul className="navbar-nav  align-items-start flex-column">
            <li className="nav-item">
              <Link to="/contacto" className="nav-link my-offcanvas-text float" aria-current="page">
                CONTACTO
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/perfil" className="nav-link  my-offcanvas-text float">
                PERFIL
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle  my-offcanvas-text float"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                STORE
              </a>
              <ul className="dropdown-menu my-dropdown">
                <li>
                  <button
                  className="dropdown-item"
                    onClick={() => handleLink("all")}
                  >
                    Ver todo
                  </button>
                </li>
                <li>
                  <button
                  className="dropdown-item"
                    onClick={() => handleLink("consolas")}
                  >
                    Consolas
                  </button>
                </li>
                <li>
                  <button
                  className="dropdown-item"
                    onClick={() => handleLink("videojuegos")}
                  >
                    Videojuegos
                  </button>
                </li>
                <li>
                  <button
                  className="dropdown-item"
                    onClick={() => handleLink("accesorios")}
                  >
                    Accesorios
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

     
      <nav className={`navbar navbar-expand-lg my-navbar py-3 px-lg-3 px-0 sticky-top ${isTransparent ? "transparent" : ""}`}>
        <div className="container-fluid">

          <div className="col-2 text-center">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dr0wlij0c/image/upload/c_thumb,w_200,g_face/v1736453861/web-illustrations/logo.png"
                className="img-fluid"
                alt="Logo"
              />
            </Link>
          </div>

          <button
            className="my-navbar-toggler navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="fa-solid fa-bars menu-icon float"></span>
          </button>

          <div className="collapse navbar-collapse me-4" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-5 d-flex justify-content-between align-items-start">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle float my-dropdown"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  STORE
                </a>
                <ul className="dropdown-menu  my-dropdown">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleLink("all")}
                    >
                      Ver todo
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleLink("consolas")}
                    >
                      Consolas
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleLink("videojuegos")}
                    >
                      Videojuegos
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleLink("accesorios")}
                    >
                      Accesorios
                    </button>
                  </li>
                </ul>
              </li>

              <div className="d-flex align-items-center">
                <li className="nav-item">
                  <Link to="/contacto" className="nav-link float" aria-current="page">
                    CONTACTO
                  </Link>
                </li>
                <li className="nav-item ms-3 float">
                  <Link to="/perfil" className="my-navbar-button px-3">
                    PERFIL
                  </Link>
                </li>
                <li className="nav-item nav-link float">
                  <img
                    src="https://res.cloudinary.com/dr0wlij0c/image/upload/v1736453861/web-illustrations/shopping-bag-icon.png"
                    className="img-fluid nav-shopping-bag"
                    alt="Shopping bag"
                  />
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
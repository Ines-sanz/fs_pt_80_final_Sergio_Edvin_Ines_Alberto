import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/modal.css";
import { Context } from "../store/appContext";

export const LoginModal = () => {
  const { store, actions } = useContext(Context);

  const handleCloseModal = () => {
    actions.setShowLoginModal(false);
    const modalElement = document.getElementById("loginModal");
    if (modalElement) {
      const modalInstance = new window.bootstrap.Modal(modalElement);
      modalInstance.hide();
      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) {
        backdrop.remove();
      }
    }
  };


  useEffect(() => {
    if (store.showLoginModal) {
      const modalElement = document.getElementById("loginModal");
      if (modalElement) {
        const modalInstance = new window.bootstrap.Modal(modalElement);
        modalInstance.show(); 
      }
    }
  }, [store.showLoginModal]); 

  if (!store.showLoginModal) {
    return null; 
  }

  return (
    <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
      <div className="modal-lg modal-dialog p-5">
        <div className="modal-content my-modal-login">
          <div className="d-flex justify-content-end p-3">
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleCloseModal}
            ></button>
          </div>
          <div className="row justify-content-end">
            <div className="col-6 pe-5">
              <h3>¡Empieza a comprar y vender!</h3>
              <p className="my-modal-text">
                ¡No te pierdas nada! Únete a la comunidad y empieza a disfrutar al completo de nuestra plataforma
              </p>
              <div className="divider"></div>
              <div className="divider"></div>
              <Link to="/perfil" className="faq-home-button" onClick={handleCloseModal}>
                ¡Regístrate!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

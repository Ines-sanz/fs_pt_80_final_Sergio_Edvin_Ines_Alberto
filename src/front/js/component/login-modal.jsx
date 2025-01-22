import React, { Component, useContext} from "react";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "../../styles/modal.css";
import { Context } from "../store/appContext";


export const LoginModal = () => {
  const{store, actions} = useContext(Context)

  const handleCloseModal = () => {
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

  return (<>
 <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">
</button>
<div class="modal fade " id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
  <div class=" modal-lg modal-dialog p-5">
    <div class="modal-content my-modal-login">
      <div className="d-flex justify-content-end p-3"><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
     </div>
    <div className="row  justify-content-end">
<div className="col-6 pe-5">
   <h3>¡No te pierdas nada!</h3>
      <p className="my-modal-text">Únete a la comunidad y empieza a comprar y vender en nuestra plataforma</p>
      <div className="divider"></div>
      <div className="divider"></div>
      <Link to="/perfil" className="faq-home-button" onClick={handleCloseModal}>¡Registrate!</Link>
</div>
    </div>
     
    </div>
  </div>
</div>
  </>)
};

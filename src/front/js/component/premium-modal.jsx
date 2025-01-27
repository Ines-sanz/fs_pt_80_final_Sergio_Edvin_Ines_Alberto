import React, { Component, useContext} from "react";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "../../styles/modal.css";
import { Context } from "../store/appContext";


export const PremiumModal = () => {
  const{store, actions} = useContext(Context)

  const handleCloseModal = () => {
    const modalElement = document.getElementById("premiumModal");
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
 <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#premiumModal">
</button>
<div className="modal fade " id="premiumModal" tabindex="-1" aria-labelledby="premiumModalLabel" aria-hidden="true">
  <div className=" modal-lg modal-dialog p-5">
    <div className="modal-content my-modal-sus">
      <div className="d-flex justify-content-end p-3"><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
     </div>
    <div className="row  justify-content-end">
<div className="col-6 pe-5 text-center">
      <img src="https://res.cloudinary.com/dr0wlij0c/image/upload/v1737132420/Manual-Final-Boss-26_efcv6i.png" alt="Premium-boss" className="img-fluid" />
      
      <div className="divider"></div>
      <div className="divider"></div>
      <p className="sus-modal-text">9.99€ <span>mes</span></p>
      <Link to="/suscripcion" className="faq-home-button" onClick={handleCloseModal}>¡Únete!</Link>
</div>
    </div>
     
    </div>
  </div>
</div>
  </>)
};

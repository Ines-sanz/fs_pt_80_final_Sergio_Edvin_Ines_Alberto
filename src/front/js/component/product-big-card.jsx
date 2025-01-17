import React, { Component, useContext} from "react";
import { Navigate, useNavigate } from "react-router";
import "../../styles/bigcard.css";
import { Context } from "../store/appContext";


export const ProductBCard = (props) => {
  const{store, actions} = useContext(Context)
  const navigate = useNavigate();

  return (<>
    <div className="row d-flex align-items-stretch" >
   
      <figure className="col-7 product-bg-bg" >
        <img
          className="img-fluid"
          src={props.img}
          alt={props.name}
        />
      </figure>

      <div className="px-3 mt-2 col-5 d-flex flex-column justify-content-between py-5">
       <div className="divider"></div> 
       <figure>
          <img src="https://res.cloudinary.com/dr0wlij0c/image/upload/v1737124509/final-boss-selection-25_g3brv4.png" alt="FinalBossSelection" className="img-fluid" />
        </figure>
        
        <div>
        <span className="big-c-brand">{props.brand}</span>
        <h5 className="big-c-name">{props.name}</h5>
        <div  className="d-flex justify-content-between">
        <span className="big-c-price">
            {props.price !== undefined && !isNaN(props.price)
              ? `${props.price.toFixed(2)}€`
              : "N/A"}
          </span>  
          <div className="d-flex align-items-center">
          <span className="fa-solid fa-plus plus-icon"></span>
        <span className="fa-solid fa-star fav-icon"></span></div>
        </div></div>
        
      </div>
    </div>
  </>)
};

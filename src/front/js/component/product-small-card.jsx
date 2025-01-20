import React, { Component, useContext} from "react";
import { Navigate, useNavigate } from "react-router";
import "../../styles/smallcard.css";
import { Context } from "../store/appContext";

export const ProductCard = (props) => {
  const{store, actions} = useContext(Context)
  const navigate = useNavigate();

  const isPromoted = props.promoted === true
  return (<>
    <div className="col-10 col-md-6 col-xl-4" >
   
      <div className={ isPromoted ? "promoted": "product-sm-bg" } >
        
        <img
          className="img-fluid"
          src={props.img}
          alt={props.name}
        />
      </div>

      <div className="px-0 mt-2">
        <span className="small-c-brand">{props.brand}</span>
        <h5 className="small-c-name">{props.name}</h5>
        <div  className="d-flex justify-content-between">
        <span className="small-c-price">
            {props.price !== undefined && !isNaN(props.price)
              ? `${props.price.toFixed(2)}€`
              : "N/A"}
          </span>  
          <div className="d-flex align-items-center">
          <span className="fa-solid fa-plus plus-icon"></span>
        <span className="fa-solid fa-star fav-icon"></span>
        </div></div>
        
      </div>
    </div>
  </>)
};

import React, { Component, useContext } from "react";
import { Navigate, useNavigate } from "react-router";
import "../../styles/smallcard.css";
import { Context } from "../store/appContext";

export const VideogameCard = (props) => {
  const { store, actions } = useContext(Context)
  const navigate = useNavigate();

  const isPromoted = props.promoted === true
  const handleFav = () => {
    const newFav = {
      user_id: store.user.id,
      product_id: props.id,
    };
    actions.toggleFav(newFav);
  };
  const isFavorite = store.user && store.user.favorites
    ? store.user.favorites.some((fav) => fav === props.id)
    : false

    const handleShopping = () => {
      const newShoppingItem = {
          user_id: store.user.id, 
          product_id: props.id,
      };
      actions.toggleCart(newShoppingItem);
    };
    const isInShopping = store.shoppingCart 
? store.shoppingCart.some((item) => item.id === props.id)
: false
  return (<>
    <div className="col-10 col-md-5 col-xl-4">
      {/* <img className="img-fluid" src={props.img} alt={props.name} onClick={handleLink} /> */}
      <div className={isPromoted ? "videogame-sm-bg videogame-sm-promoted" : "videogame-sm-bg"} >

        <img
          className="img-fluid"
          src={props.img}
          alt={props.name}
        />
      </div>

      <div className="px-0 mt-2">
        <span className="small-c-brand">{props.brand}</span>
        <h5 className="small-c-name">{props.name}</h5>
        <div className="d-flex justify-content-between">
          <span className="small-c-price">
            {props.price !== undefined && !isNaN(props.price)
              ? `${props.price.toFixed(2)}€`
              : "N/A"}
          </span>
          <div>
            <div className="d-flex align-items-center">
            <span className="fa-solid fa-plus plus-icon" style={{
    opacity: isInShopping ? 1 : 0.4,
    color: isInShopping ? "#15a3f5" : "#FFFFFF" 
  }} onClick={handleShopping}></span>
              <span className="fa-solid fa-star fav-icon" style={{opacity: isFavorite ? 1 : 0.4, }}  onClick={handleFav}></span>
            </div>
          </div>

        </div>

      </div>
    </div>
  </>)
};

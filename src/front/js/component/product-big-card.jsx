import React, { Component, useContext } from "react";
import { Navigate, useNavigate } from "react-router";
import "../../styles/bigcard.css";
import { Context } from "../store/appContext";


export const ProductBCard = (props) => {
  const { store, actions } = useContext(Context)
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${props.id}`);
  };

  const handleFav = (e) => {
    e.stopPropagation();
    if (!store.isLogged) {
      if (!store.showLoginModal) {
        actions.setShowLoginModal(true);
      }else {
        alert("Debes iniciar sesión para añadir artículos a favoritos");
      }
    } else {
  
      const newFav = {
        user_id: store.user.id,
        product_id: props.id,
      };
      actions.toggleFav(newFav);
    }
  };
const handleShopping = () => {
  if (!store.isLogged) {
    if (!store.showLoginModal) {
      
      actions.setShowLoginModal(true); 
    } else {
      alert("Debes iniciar sesión para añadir artículos al carrito");
    }
  } else {
   
    const newShoppingItem = {
      user_id: store.user.id,
      product_id: props.id,
    };
    actions.toggleCart(newShoppingItem);
  }
};
  const isFavorite = store.user && store.user.favorites
    ? store.user.favorites.some((fav) => fav === props.id)
    : false;

 

  const isInShopping = store.shoppingCart
    ? store.shoppingCart.some((item) => item.id === props.id)
    : false;

  return (<>
    <div className="row d-flex align-items-stretch"  >

      <figure className="col-7 product-bg-bg" onClick={handleCardClick}>
        <img
          className="img-fluid"
          src={props.img}
          alt={props.name}
        />
      </figure>

      <div className="px-3 mt-2 col-5 d-flex flex-column justify-content-between py-5 ">
        <div className="divider"></div>
        <figure>
          <img src="https://res.cloudinary.com/dr0wlij0c/image/upload/v1737124509/final-boss-selection-25_g3brv4.png" alt="FinalBossSelection" className="img-fluid" />
        </figure>

        <div>
          <span className="big-c-brand" onClick={handleCardClick}>{props.brand}</span>
          <h5 className="big-c-name" onClick={handleCardClick}>{props.name}</h5>
          <div className="d-flex justify-content-between">
            <span className="big-c-price">
              {props.price !== undefined && !isNaN(props.price)
                ? `${props.price.toFixed(2)}€`
                : "N/A"}
            </span>
            <div className="d-flex align-items-center">
              <span className="fa-solid fa-plus plus-icon" style={{
                opacity: isInShopping ? 1 : 0.4,
                color: isInShopping ? "#15a3f5" : "#FFFFFF"
              }} onClick={handleShopping}></span>
              <span
                className="fa-solid fa-star fav-icon"
                style={{ opacity: isFavorite ? 1 : 0.4, }}
                onClick={handleFav}>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
};

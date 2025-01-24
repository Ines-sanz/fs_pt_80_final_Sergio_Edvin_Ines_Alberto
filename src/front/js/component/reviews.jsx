import React, { Component, useContext } from "react";
import { Navigate, useNavigate } from "react-router";
import "../../styles/reviews.css";
import { Context } from "../store/appContext";

export const Reviews = (props) => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();
    const rating = props.rating;
    const getStarStyle = (starIndex) => {
        if (starIndex <= rating) {
            return {
                color: "#FCEE21",
                opacity: 1,
            };
        } else {
            return {
                color: "white",
                opacity: 0.4,
            };
        }
    };

    const product = store.consolas.concat(store.videojuegos, store.accesorios)
    .find((prod) => prod.id === props.product_id);

    const productName = product ? product.name : "Producto no encontrado"; 

    const user = store.users.find((user) => user.id === props.user_id);

    const userName = user ? user.userName : "Usuario no encontrado"; 

    return (<>
        <div className="col-10 col-md-4 col-xl-3 my-4" >
            <div className="d-flex justify-content-center mb-3">
                <span className="fa-solid fa-star fav-icon" style={getStarStyle(1)}></span>
                <span className="fa-solid fa-star fav-icon" style={getStarStyle(2)}></span>
                <span className="fa-solid fa-star fav-icon" style={getStarStyle(3)}></span>
                <span className="fa-solid fa-star fav-icon" style={getStarStyle(4)}></span>
                <span className="fa-solid fa-star fav-icon" style={getStarStyle(5)}></span>
            </div>
            <div className="card-review px-2">
            <h3 className="card-review-h3">{userName}</h3> 
            <p className="card-review-p">{props.comment}</p>
            <h5 className="card-review-h5">{productName}</h5>
            </div>
        </div>
    </>)
};

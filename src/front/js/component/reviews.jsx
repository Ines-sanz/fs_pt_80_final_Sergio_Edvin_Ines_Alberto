import React, { Component, useContext } from "react";
import { Navigate, useNavigate } from "react-router";
import "../../styles/reviews.css";
import { Context } from "../store/appContext";

export const Reviews = (props) => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();
    const rating = 1;
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
    return (<>
        <div className="col-10 col-md-4 col-xl-3 px-5" >
            <div className="d-flex justify-content-center mb-3">
                <span className="fa-solid fa-star fav-icon" style={getStarStyle(1)}></span>
                <span className="fa-solid fa-star fav-icon" style={getStarStyle(2)}></span>
                <span className="fa-solid fa-star fav-icon" style={getStarStyle(3)}></span>
                <span className="fa-solid fa-star fav-icon" style={getStarStyle(4)}></span>
                <span className="fa-solid fa-star fav-icon" style={getStarStyle(5)}></span>
            </div>
            <div className="card-review px-2">
            <h3 className="card-review-h3">User Name</h3>
            <p className="card-review-p">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit laboriosam saepe soluta molestiae in iste atque quam qui odit rerum enim quae nam amet cupiditate, deserunt modi ullam necessitatibus et.</p>
            <h5 className="card-review-h5">Product Name</h5>
            </div>
        </div>
    </>)
};

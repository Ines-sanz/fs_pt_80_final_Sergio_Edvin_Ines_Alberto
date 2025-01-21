import React, { Component, useContext } from "react";
import { Navigate, useNavigate } from "react-router";
import "../../styles/smallcard.css";
import { Context } from "../store/appContext";

export const CartItem = (props) => {
    const { store, actions } = useContext(Context)
    

    return (<>
        <div className="d-flex shopping-c-item p-1" >

            <img
                 className="img-fluid"
                 src={props.img}
                 alt={props.name}
            />

            <div className="px-0 mt-2">
                <h5 className="shopping-c-name">{props.name}</h5>
                <span className="shopping-c-brand">Vendido por: </span>
                <div className="d-flex justify-content-between">
                    <span className="shopping-c-price">
                        {props.price}
                    </span>
                    <div className="d-flex align-items-center">
                    </div>
                </div>

             </div>
        </div>
        </>)
};
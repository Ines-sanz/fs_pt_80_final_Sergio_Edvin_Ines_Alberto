import React, { Component, useContext } from "react";
import { Navigate, useNavigate } from "react-router";
import "../../styles/smallcard.css";
import { Context } from "../store/appContext";

export const CartItem = (props) => {
    const { store, actions } = useContext(Context)


    return (<>
        <div className="d-flex shopping-c-item p-1" >
            <figure>
                <img
                    className="img-fluid"
                    src={props.img}
                    alt={props.name}
                /></figure>

            <div className="px-0 mt-2 d-flex">
                <div className="align-self-start ">
                    <span class="fa-solid fa-x close-shopping"></span>
                </div>
                <div className="align-self-end mb-2">
                    <h5 className="shopping-c-name">{props.name}</h5>
                    <span className="shopping-c-brand">
                        Vendido por: <span className="seller-user">{
                            props.seller_id
                                ? users.find(user => user.id === props.seller_id)?.userName || "FinalBoss Store"
                                : "FinalBoss Store"
                        }</span>
                    </span>

                    <div className="d-flex justify-content-between">
                        <span className="shopping-c-price">
                            {props.price !== undefined && !isNaN(props.price)
                                ? `${props.price.toFixed(2)}€`
                                : "N/A"}
                        </span>
                        <div className="d-flex align-items-center">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
};
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/productview.css";

export const ProductView = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="product-container">
            <section className="product-header">
                <div className="row">
                    <div className="product-body">
                        <div className="col-md-6 product-title">
                            <p className="brand">Nintendo</p>
                            <h1 className="product-name mb-3">Nintendo GameCube</h1>
                        </div>
                        <div className="product-image">
                            <img src="https://res.cloudinary.com/dr0wlij0c/image/upload/v1735397962/GameCube-Set_vokzkr.jpg" alt="Producto" />
                        </div>
                    </div>
                    <div className="col-md-6 product-info">
                        <p><strong>Año:</strong> 2001</p>
                        <p><strong>Estado:</strong> Used</p>
                        <p><strong>Plataforma:</strong> Game Cube</p>
                        <p><strong>Tipo:</strong> Sobremesa</p>
                        <p><strong>Vendido por:</strong> Machete</p>
                        <div className="rating">
                            <span>⭐⭐⭐⭐☆</span>
                        </div>
                        <div className="product-price">
                            <p>Precio</p>
                            <p className="price-value">90€</p>
                        </div>
                    </div>
                </div>
            </section >

            <section className="product-description">
                <p>
                    La Nintendo GameCube es una consola que destacó por sus juegos exclusivos y su diseño compacto. Ideal para\nFans de Nintendo que quieren revivir una consola muy querida.
                </p>
            </section>

            <section className="product-button">
                <button className="buy-button">Comprar</button>
            </section>
        </div >
    );
};
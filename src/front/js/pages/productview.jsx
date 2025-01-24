import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/productview.css";

export const ProductView = () => {
    const { id } = useParams(); 
    const { store, actions } = useContext(Context);
    const [product, setProduct] = useState(null);

    
    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await actions.getProductById(id);
            setProduct(fetchedProduct);
        };
        fetchProduct();
    }, [id]);

    
    if (!product) {
        return <p>Cargando producto...</p>;
    }

    return (
        <div className="product-container">
            <section className="product-header">
                <div className="row __product__">
                    <article className="__product_body__">
                        <div className="col-md-6 __product_title__">
                            <p className="brand">{product.brand}</p>
                            <h1 className="product-name mb-3">{product.name}</h1>
                        </div>
                        <div className="product-image">
                            <img src={product.img} alt={product.name} />
                        </div>
                    </article>
                    <div className="col-md-6 __product_info__">
                        <p><strong>Año:</strong> {product.year}</p>
                        <p><strong>Estado:</strong> {product.state ? "Nuevo" : "Usado"}</p>
                        <p><strong>Plataforma:</strong> {product.platform}</p>
                        <p><strong>Tipo:</strong> {product.type}</p>
                        {/*<p><strong>Vendido por:</strong> {product.seller_id}</p>*/}
                        <div className="rating">
                            <span>⭐⭐⭐⭐☆</span>  {/*A modificar cuando tengamos hecho el review*/}
                        </div>
                        <div className="product-price">
                            <p>Precio</p>
                            <p className="price-value">{product.price.toFixed(2)}€</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="product-description">
                <p>{product.description}</p>
            </section>

            <section className="product-button">
                <button className="buy-button">Comprar</button>
            </section>
        </div>
    );
};
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/productview.css";

export const ProductView = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const [product, setProduct] = useState(null);
    const [rating, setRating] = useState(0);
    const [buyer, setBuyer] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await actions.getProductById(id);
            setProduct(fetchedProduct);
        };

        const users = [
            "juanito22", "CarmenEspaña", "halamadrid10", "ClassicAaron",
            "PixelAndrea", "retroLucas", "AlbertoGamer", "MarianaAdventure",
            "RaulCollector", "SofiaLover", "MartinRetro", "LauraPlays"
        ];

        const getRandomUser = () => users[Math.floor(Math.random() * users.length)];
        setBuyer(getRandomUser());

        const generateRandomRating = () => {
            const randomRating = Math.floor(Math.random() * 3) + 3;
            setRating(randomRating);
        };

        fetchProduct();
        generateRandomRating();
    }, [id]);

    const handleAddToCart = () => {
        const newShoppingItem = {
            user_id: store.user.id,
            product_id: product.id,
        };
        actions.toggleCart(newShoppingItem);
    };
    const renderStars = () => {
        let stars = "";
        for (let i = 0; i < 5; i++) {
            stars += i < rating ? "★" : "☆";
        }
        return stars;
    };

    if (!product) {
        return <p>Cargando producto...</p>;
    }

    return (
        <div className="product-container">
            <section className="__product_header__">
                <div className="row align-items-center">
                    <div className="col-md-6 d-flex flex-column align-items-start">
                        <p className="brand">{product.brand}</p>
                        <h1 className="product-name">{product.name}</h1>
                        <div className="d-flex justify-content-center mt-3">
                            <img
                                src={product.img}
                                alt={product.name}
                                className="img-fluid product-image"
                            />
                        </div>
                    </div>
                    <div className="col-md-6 product-info">
                        <div className="row">
                            <div className="col-6">
                                <p className="info-label">Año:</p>
                                <p className="info-value">{product.year}</p>
                            </div>
                            <div className="col-6">
                                <p className="info-label">Estado:</p>
                                <p className="info-value">{product.state ? "Nuevo" : "Usado"}</p>
                            </div>
                            <div className="col-12">
                                <p className="info-label">Plataforma:</p>
                                <p className="info-value">{product.platform}</p>
                            </div>
                            <div className="col-12">
                                <p className="info-label">Tipo:</p>
                                <p className="info-value">{product.type}</p>
                            </div>
                            <div className="col-12 d-flex align-items-start mb-4">
                                <p className="info-label">Vendido por:</p>
                                <div className="d-flex align-items-col ms-2">
                                    <img
                                        src={"https://res.cloudinary.com/dr0wlij0c/image/upload/v1736453861/web-illustrations/premium-user.png"}
                                        className="seller-avatar"
                                    />
                                    <span className="ms-2">{buyer}</span>
                                </div>
                            </div>
                            <div className="col-12 d-flex justify-content-between align-items-center">
                                <span className="rating">{renderStars()}</span>
                                <div className="product-price">
                                    <p className="price-value">{product.price.toFixed(2)}€</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="product-description mt-4">
                <div className="row">
                    <div className="col-12">
                        <p>{product.description}</p>
                    </div>
                </div>
            </section>

            <section className="product-button mt-4">
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <button className="btn btn-warning" onClick={handleAddToCart}>
                            Comprar
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};
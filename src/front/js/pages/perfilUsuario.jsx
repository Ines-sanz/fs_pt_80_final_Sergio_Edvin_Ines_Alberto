import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/perfil.css";

import { ProductCard } from "../component/product-small-card.jsx";
import { Reviews } from "../component/reviews.jsx";


export const PerfilUsuario = () => {
    const { actions, store } = useContext(Context);
    const { userId } = useParams(); // Obtener el ID del usuario desde la URL
    const [userData, setUserData] = useState(null); // Estado local para los datos del usuario
    const [favoritesDetails, setFavoritesDetails] = useState([]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const data = await actions.getUserProfile(userId); // Llama a la acción para obtener los datos del usuario
            setUserData(data); // Guarda los datos en el estado local

            if (data?.favorites?.length > 0) {
                // Obtener los detalles de los productos favoritos
                const details = await Promise.all(
                    data.favorites.map((fav) => actions.getProductDetails(fav.product_id))
                );
                setFavoritesDetails(details); // Guardar los detalles en el estado
            }
        };

        fetchUserProfile(); // Ejecuta la función al cargar el componente
    }, [userId, actions]);

    if (!userData) {
        return <p>Cargando datos del usuario...</p>;
    }

    return (
        <div className="profile-container-log">
            <div className="profile-header-log">
                <div className="profile-avatar-container-log">
                    <img
                        src={userData.avatar || "https://via.placeholder.com/150"}
                        alt="Avatar del usuario"
                        className="profile-avatar-log"
                    />
                </div>
                <div className="profile-info-log">
                    <h1 className="profile-name-log">{userData.userName}</h1>
                    <p className="profile-email-log">{userData.email}</p>

                    <div className="profile-stats-log">
                        <span className="followers-log">{userData.followed_by.length} Seguidores</span>
                        <span className="following-log">{userData.following_users.length} Seguidos</span>
                    </div>
                </div>
            </div>
            <div className="profile-description-log">
                <p>{userData.description || "Descripción no proporcionada."}</p>
            </div>
            <h3 className="t-section">REVIEWS</h3>
            <div className="row pt-1 d-flex">
                {store.reviews
                    ?.filter((review) => review.user_id === Number(userId))
                    .map((review) => (
                        <Reviews
                            key={review.id}
                            user_id={review.user_id}
                            rating={review.rating}
                            comment={review.comment}
                            product_id={review.product_id}
                        />
                    ))}
            </div>

            <h3 className="t-section">FAVORITOS</h3>
            <div className="horizontal-scrollable">
                <div className="row flex-nowrap pt-1">
                    {favoritesDetails.length > 0 ? (
                        favoritesDetails.map((fav) => (
                            <ProductCard
                                key={fav.id}
                                img={fav.img}
                                name={fav.name}
                                brand={fav.brand}
                                price={fav.price}
                                promoted={fav.promoted}
                                id={fav.id}
                            />
                        ))
                    ) : (
                        <p>No tienes productos favoritos.</p>
                    )}
                </div>

            </div>
            <div className="profile-section-log">
                <h3 className="t-section">ESCAPARATE</h3>
                <div className="horizontal-scrollable">
                    <div className="row flex-nowrap pt-1">
                        {userData.products?.length > 0 ? (
                            userData.products.map((product) => (
                                <div key={product.id} className="showcase-item-log">
                                    <img src={product.img} alt={product.name} className="showcase-img-log" />
                                    <p>{product.name}</p>
                                    <span>{product.price} €</span>
                                </div>
                            ))
                        ) : (
                            <p>No tiene productos en su escaparate.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

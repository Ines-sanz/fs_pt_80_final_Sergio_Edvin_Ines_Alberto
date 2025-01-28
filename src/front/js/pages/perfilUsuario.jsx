import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/perfil.css";

export const PerfilUsuario = () => {
    const { actions } = useContext(Context);
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
                    <p className="profile-address-log">
                        {userData.description}
                    </p>
                    <div className="profile-stats-log">
                        <span className="followers-log">{userData.followed_by.length} Seguidores</span>
                        <span className="following-log">{userData.following_users.length} Seguidos</span>
                    </div>
                </div>
            </div>
            <div className="profile-description-log">
                <p>{userData.description || "Descripción no proporcionada."}</p>
            </div>
            <div className="profile-section-log">
                <h2>Favoritos</h2>
                <div className="horizontal-scrollable">
                    <div className="row flex-nowrap pt-1">
                        {favoritesDetails.length > 0 ? (
                            favoritesDetails.map((fav) => (
                                <div key={fav.id} className="favorite-item-log">
                                    <img src={fav.img} alt={fav.name} className="favorite-img-log" />
                                    <p>{fav.name}</p>
                                    <span>{fav.price} €</span>
                                </div>
                            ))
                        ) : (
                            <p>No tiene productos favoritos.</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="profile-section-log">
                <h2>Escaparate</h2>
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

import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/sellview.css";
import { useNavigate } from "react-router-dom";
//import { ImageSelector } from "../../imageselector.jsx";

export const SellView = () => {
    const { store, actions } = useContext(Context);
    const [typeOptions, setTypeOptions] = useState([]);
    const navigate = useNavigate();

    // Función para actualizar las opciones de "Tipo" según la categoría seleccionada
    const updateTypeOptions = (category) => {
        if (category === "consola") {
            setTypeOptions(["Sobremesa", "Portátil", "Híbrida"]);
        } else if (category === "juego") {
            setTypeOptions([
                "Acción",
                "Aventura",
                "Rol (RPG)",
                "Estrategia",
                "Deportes",
                "Peleas",
                "Plataformas",
                "Terror/Survival Horror",
                "Indie",
            ]);
        } else if (category === "accesorio") {
            setTypeOptions(["Accesorio"]);
        } else {
            setTypeOptions([]);
        }
    };
    
    const handleGoToPremium = () => {
        navigate("/suscripcion");
    };


    return (
        <div className="sell-container">
            <section className="sell-header">
                <h1 className="title">¡Empieza a vender!</h1>
                <p className="subtitle">Fácil y rápido, con total seguridad. Garantía Final Boss.</p>
            </section>

            <section className="row __image__">
                <div className="col-md-4 __photo__">
                    <label htmlFor="photo-input" className="__image_placeholder__">
                        <span className="plus">+</span>
                    </label>
                    <input
                        type="file"
                        className="photo-input"
                        id="photo-input"
                    />
                </div>

                <div className="col-md-8 __details__">
                    <p className="upload-text">
                        Sube tu foto, añade los datos y empieza a vender. Recuerda que puedes promocionar hasta dos
                        artículos sin coste extra con tu suscripción.
                    </p>
                    <div className="button-group">
                        <button className="promote_button">Promocionar</button>
                        <button className="premium_button" onClick={handleGoToPremium}>Go to Premium</button>
                    </div>
                </div>
            </section>

            <section className="__form_section__">
                <form className="__selling_form__">
                    <div className="__form_data__">
                        <div className="col-md-6 __form_group__">
                            <label htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Nombre"
                            />
                        </div>
                        <div className="col-md-6">
                            <div className="__form_data_horizontal__">
                                <div className="__form_group__">
                                    <label htmlFor="category">Categoría</label>
                                    <select
                                        id="category"
                                        onChange={(e) => updateTypeOptions(e.target.value)}
                                    >
                                        <option value="">Selecciona</option>
                                        <option value="consola">Consola</option>
                                        <option value="juego">Juego</option>
                                        <option value="accesorio">Accesorio</option>
                                    </select>
                                </div>
                                <div className="__form_group__">
                                    <label htmlFor="state">Estado</label>
                                    <select id="state">
                                        <option value="">Selecciona</option>
                                        <option value="nuevo">Nuevo</option>
                                        <option value="usado">Usado</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="__form_data__">
                        <div className="__form_group__">
                            <label htmlFor="brand">Marca</label>
                            <input
                                type="text"
                                id="brand"
                                placeholder="Marca"
                            />
                        </div>
                        <div className="__form_group__">
                            <label htmlFor="year">Año</label>
                            <input
                                type="text"
                                id="year"
                                placeholder="Año"
                            />
                        </div>
                    </div>
                    <div className="__form_data__">
                        <div className="__form_group__">
                            <label htmlFor="platform">Plataforma</label>
                            <input
                                type="text"
                                id="platform"
                                placeholder="Plataforma"
                            />
                        </div>
                        <div className="__form_group__">
                            <label htmlFor="type">Tipo</label>
                            <select id="type">
                                <option value="">Selecciona</option>
                                {typeOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="__form_group__">
                        <label htmlFor="description">Descripción</label>
                        <textarea
                            id="description"
                            placeholder="Escribe una descripción..."
                        ></textarea>
                    </div>
                    <div className="__price_group__">
                        <label htmlFor="price">Precio</label>
                        <input
                            type="number"
                            id="price"
                            min="0"
                            step="0.01"
                            placeholder="€uros"
                        />
                    </div>
                    <div className="button-wrapper">
                        <button type="submit" className="__sell_button__">
                            Vender
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};
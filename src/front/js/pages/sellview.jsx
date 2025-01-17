import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/sellview.css";

export const SellView = () => {
    /*const { store, actions } = useContext(Context);*/

    return (
        <div className="container">
            <section className="header">
                <h1 className="title">¡Empieza a vender!</h1>
                <p className="subtitle">Fácil y rápido, con total seguridad. Garantía Final Boss.</p>
            </section>

            <section className="row __image__">
                <div className="photo-column col-3">
                    <label htmlFor="photo-input" className="__image_placeholder__">
                        <span className="plus">+</span>
                    </label>
                    <input 
                        type="file"
                        className="photo-input" 
                        id="photo-input"   
                        style={{ display: 'none' }}/>
                </div>

                <div className="details-column col-9">
                    <p className="upload-text">Sube tu foto, añade los datos y empieza a vender. Recuerda que puedes promocionar hasta dos artículos sin coste extra con tu suscripción.</p>
                    <div className="button-group">
                        <button className="promote_button">Promocionar</button>
                        <button className="premium_button">Go to Premium</button>
                    </div>
                </div>
            </section>

            <section className="form-section">
                <form className="__selling_form__">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Nombre</label>
                            <input 
                                type="text"
                                id="name"  
                                placeholder="Nombre"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Categoría</label>
                            <select id="category">
                                <option value="">Selecciona</option>
                                <option value="consola">Consola</option>
                                <option value="juego">Juego</option>
                                <option value="accesorio">Accesorio</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="state">Estado</label>
                            <select id="state">
                                <option value="">Selecciona</option>
                                <option value="nuevo">Nuevo</option>
                                <option value="usado">Usado</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="brand">Marca</label>
                            <input 
                                type="text" 
                                id="brand"  
                                placeholder="Marca"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="year">Año</label>
                            <input 
                                type="number" 
                                id="year"  
                                placeholder="Año"/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="platform">Plataforma</label>
                            <input 
                                type="text" 
                                id="platform"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="type">Tipo</label>
                            <select id="type">
                                <option value="">Selecciona</option>
                                <option value="consola">Consola</option>
                                <option value="juego">Juego</option>
                                <option value="accesorio">Accesorio</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descripción</label>
                        <textarea 
                            id="description" 
                            placeholder="Escribe una descripción..."></textarea>
                    </div>
                    <div className="form-group price-group">
                        <label htmlFor="price">Precio</label>
                        <input 
                            type="number" 
                            id="price"  
                            min="0" 
                            step="0.01" placeholder="Inserta Precio" />
                    </div>
                    <div className="button-wrapper">
                        <button type="submit" className="sell-button">Vender</button>
                    </div>
                </form>
            </section>
        </div>
    );
};

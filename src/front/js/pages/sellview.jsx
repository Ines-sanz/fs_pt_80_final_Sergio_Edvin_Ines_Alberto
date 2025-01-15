import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/sellview.css";

export const SellView = () => {
    /*const { store, actions } = useContext(Context);*/

    return (
        <div className="container">
            <section className="section">
                <h1 className="title">¡Empieza a vender!</h1>
                <p className="subtitle">Fácil y rápido, con total seguridad. Garantía Final Boss.</p>
            </section>

            <section className="promotion">
                <div className="image">
                    <input type="file" className="photo_input" id="photo_input"/>
                </div>
                <div className="buttons">
                <button className="promote_button">Promocionar</button>
                <button className="promote_button">Go to Premium</button>
                </div>
            </section>

            <article className="product">
                <form className="">

                    <div className="row">
                        <div className="name">
                            <label htmlFor="name">Nombre</label>
                            <input type="text"  placeholder="Introduce nombre" id="name" />
                        </div>
                        <div className="category">
                            <label htmlFor="category">Categoría</label>
                            <select id="category">
                                <option value="">Selecciona</option>
                                <option value="consolas">Consolas</option>
                                <option value="videojuegos">Videojuegos</option>
                                <option value="accesorios">Accesorios</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="marca">
                            <label htmlFor="brand">Marca</label>
                            <input type="text" placeholder="Introduce marca" id="brand" />
                        </div>
                        <div className="año">
                            <label htmlFor="year">Año</label>
                            <input type="number" placeholder="Selecciona año" id="year"  />
                        </div>
                    </div>

                    <div className="row">
                        <div className="plataforma">
                            <label htmlFor="platform">Plataforma</label>
                            <input type="text" placeholder="Introduce Plataforma" id="platform"  />
                        </div>
                        <div className="tipo">
                            <label htmlFor="type">Tipo</label>
                            <select id="type">
                                <option value="">Selecciona</option>
                                <option value="nuevo">Nuevo</option>
                                <option value="usado">Usado</option>
                            </select>
                        </div>
                    </div>

                    <div className="descripcion">
                        <label htmlFor="description">Descripción</label>
                        <textarea placeholder="Agrega una descripción" id="description"/>
                    </div>

                    <div className="precio">
                        <label htmlFor="price">Precio</label>
                        <input type="number" placeholder="Introduce Precio" id="price"  />
                    </div>

                    <button type="submit" className="sell_button">Vender</button>
                </form>
            </article>
        </div>
    );
};

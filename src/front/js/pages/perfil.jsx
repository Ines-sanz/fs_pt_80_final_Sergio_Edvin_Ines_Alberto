import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/perfil.css";


export const Perfil = () => {
    const { store, actions } = useContext(Context);

    //de momento supongo que store.token almacena el token JWT
    const isLoggedIn = !!store.token; // Comprueba si el token existe


    return (
       <>
       {/* registro */}
       <div className="container-fluid min-vh-100">
            <div className="row h-100">
                    {/* Sección de la imagen */}
                    <div className="col-md-7 bg-image p-0 d-none d-md-block">
                        <img
                            src="https://res.cloudinary.com/dr0wlij0c/image/upload/v1736524948/web-illustrations/pahoayuyvzokhyh6mj03.png"
                            alt="Icono"
                            className="w-100 h-100"
                        />
                    </div>
                    {/* Sección del formulario */}
                    <div className="col-md-5 d-flex align-items-center justify-content-center form-alt">
                        <div className="form-container p-5 rounded">
                            <form>
                                <div className="text-center mb-4">
                                    <img
                                        src="https://res.cloudinary.com/dr0wlij0c/image/upload/v1736453861/web-illustrations/user.png"
                                        alt="Perfil"
                                        className="profile-icon mb-3"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email*
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control bg-dark text-white border-0"
                                        id="email"
                                        placeholder="ejemplo@ejemplo.com"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Contraseña*
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control bg-dark text-white border-0"
                                        id="password"
                                        placeholder="Contraseña"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="repeatPassword" className="form-label">
                                        Repetir Contraseña*
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control bg-dark text-white border-0"
                                        id="repeatPassword"
                                        placeholder="Repite tu contraseña"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">
                                        Nombre*
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control bg-dark text-white border-0"
                                        id="nombre"
                                        placeholder="Nombre"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="sobre" className="form-label">
                                        Sobre ti
                                    </label>
                                    <textarea
                                        className="form-control bg-dark text-white border-0"
                                        id="sobre"
                                        rows="3"
                                        placeholder="Escribe algo sobre ti"
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="direccion" className="form-label">
                                        Dirección*
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control bg-dark text-white border-0"
                                        id="direccion"
                                        placeholder="Dirección"
                                    />
                                </div>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label htmlFor="ciudad" className="form-label">
                                            Ciudad*
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control bg-dark text-white border-0"
                                            id="ciudad"
                                            placeholder="Ciudad"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="cp" className="form-label">
                                            CP*
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control bg-dark text-white border-0"
                                            id="cp"
                                            placeholder="Código Postal"
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-crear-perfil mt-4">
                                    Crear perfil
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
       </>
    );
};

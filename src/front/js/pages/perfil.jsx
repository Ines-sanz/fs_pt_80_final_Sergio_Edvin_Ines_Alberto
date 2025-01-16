import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/perfil.css";

export const Perfil = () => {
    const { store, actions } = useContext(Context);

    // Estado para controlar si se muestra "Registrarse" o "Login"
    const [isRegister, setIsRegister] = useState(null);

    return (
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
                {/* Sección del formulario o botones iniciales */}
                <div className="col-md-5 d-flex align-items-center justify-content-center form-alt">
                    <div className="form-container p-5 rounded text-center">
                        {/* Si no se ha elegido nada, mostramos los botones */}
                        {isRegister === null && (
                            <>
                                <h2 className="mb-4">¿Qué deseas hacer?</h2>
                                <button
                                    className="btn btn-primary w-100 mb-3"
                                    onClick={() => setIsRegister(true)}
                                >
                                    Registrarse
                                </button>
                                <button
                                    className="btn btn-secondary w-100"
                                    onClick={() => setIsRegister(false)}
                                >
                                    Login
                                </button>
                            </>
                        )}
                        {/* Si elige "Registrarse", muestra el formulario */}
                        {isRegister === true && (
                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault(); 

                                    // Extraemos los valores de los campos
                                    const email = e.target.email.value;
                                    const password = e.target.password.value;
                                    const repeatPassword = e.target.repeatPassword.value;
                                    const userName = e.target.nombre.value;
                                    const address = e.target.direccion.value;
                                    const postalCode = e.target.cp.value;
                                    const city = e.target.ciudad.value;

                                    // Verificamos que las contraseñas coincidan
                                    if (password !== repeatPassword) {
                                        alert("Las contraseñas no coinciden. Por favor, verifica e inténtalo de nuevo.");
                                        return;
                                    }

                                    try {
                                        const response = await fetch(`${process.env.BACKEND_URL}register`, {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({
                                                email,
                                                password,
                                                userName,
                                                address,
                                                postalCode,
                                                city,
                                            }),
                                        });
                                    
                                        const data = await response.json();
                                    
                                        if (response.ok) {
                                            // Registro exitoso
                                            alert("Registro exitoso. Bienvenido!");
                                            console.log("Token:", data.token);
                                            console.log("Usuario:", data.user);
                                            // Hay que decidir donde guardar el Token que se recibe
                                        } else {
                                            // Error en el registro
                                            alert(data.msg || "Error durante el registro");
                                        }
                                    } catch (error) {
                                        alert("Error al conectar con el servidor");
                                        console.error(error);
                                    }
                                }}
                            >
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
                                    required
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
                                    required
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
                                    required
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
                                    required
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
                                    required
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
                                        required
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
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-crear-perfil mt-4">
                                Crear perfil
                            </button>

                            <button
                                    type="button"
                                    className="btn btn-link mt-3"
                                    onClick={() => setIsRegister(null)}
                                >
                                    Volver
                                </button>
                        </form>
                        )}
                        {isRegister === false && (
                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault(); 
                                    const email = e.target.email.value;
                                    const password = e.target.password.value;
                                
                                    try {
                                        const response = await fetch(`${process.env.BACKEND_URL}login`, {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({
                                                email,
                                                password,
                                            }),
                                        });
                                    
                                        const data = await response.json();
                                        if (response.ok) {
                                            alert("Inicio de sesión exitoso");
                                            console.log("Token:", data.token);
                                            // Hay que decidir donde guardar el Token que se recibe
                                        } else {
                                            alert(data.msg || "Error en el inicio de sesión");
                                        }
                                    } catch (error) {
                                        alert("Error al conectar con el servidor");
                                        console.error(error);
                                    }
                                }}
                            >
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email*
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control bg-dark text-white border-0"
                                        id="email"
                                        name="email"
                                        placeholder="ejemplo@ejemplo.com"
                                        required
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
                                        name="password"
                                        placeholder="Contraseña"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100 mt-4">
                                    Iniciar sesión
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-link mt-3"
                                    onClick={() => setIsRegister(null)}
                                >
                                    Volver
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

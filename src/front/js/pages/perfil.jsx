import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/perfil.css";

export const Perfil = () => {
    const { store, actions } = useContext(Context);

    // Estado para controlar si se muestra "Registrarse" o "Login"
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        email:"",
        password:"",
        repeatPassword:"",
        userName:""
    });

    const [formData1, setFormData1] = useState({
        email:"",
        password:""
    });

    const handleChange=e => setFormData({...formData,[e.target.name]:e.target.value})
    const handleChange1=e => setFormData1({...formData1,[e.target.name]:e.target.value})



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


                                    // Verificamos que las contraseñas coincidan
                                    if (formData.password !== formData.repeatPassword) {
                                        alert("Las contraseñas no coinciden. Por favor, verifica e inténtalo de nuevo.");
                                        return;
                                    }

                                    actions.register(formData)
                                    
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
                                    name="email"
                                    value = {formData.email}
                                    onChange={handleChange}
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
                                    name="password"
                                    value = {formData.password}
                                    onChange={handleChange}
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
                                    name="repeatPassword"
                                    value = {formData.repeatPassword}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">
                                    Nombre*
                                </label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white border-0"
                                    id="userName"
                                    placeholder="Username"
                                    required
                                    name="userName"
                                    value = {formData.userName}
                                    onChange={handleChange}

                        
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
                                    className="btn btn-secondary w-100 mt-4"
                                    onClick={() => setIsRegister(false)}
                                >
                                    Login
                                </button>
                        </form>
                        )}
                        {isRegister === false && (
                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault(); 
                                    const email = e.target.email.value;
                                    const password = e.target.password.value;

                                    actions.login(formData1)
                                
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
                                    value = {formData1.email}
                                    onChange={handleChange1}
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
                                    value = {formData1.password}
                                    onChange={handleChange1}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100 mt-4">
                                    Iniciar sesión
                                </button>
                                <button
                                    className="btn btn-primary w-100 mb-3 mt-4"
                                    onClick={() => setIsRegister(true)}
                                >
                                    Registrarse
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

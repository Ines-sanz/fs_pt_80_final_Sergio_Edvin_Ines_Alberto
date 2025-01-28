import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/perfil.css";

export const Perfil = () => {
    const { store, actions } = useContext(Context);
    const [userData, setUserData] = useState(null);
    const [showUserList, setShowUserList] = useState(false); // Estado para mostrar la lista de usuarios
    const [users, setUsers] = useState([]); // Estado para almacenar la lista de usuarios


    useEffect(() => {
        if (store.isLogged && store.user) {
            setUserData(store.user);
            actions.getFavorites();
        }
    }, [store.isLogged, store.user]);

     // Función para obtener usuarios desde la API
     const fetchUsers = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data); // Guardamos la lista de usuarios en el estado
            } else {
                console.error("Error al obtener la lista de usuarios");
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    // Función para manejar el clic en el botón "+ Usuarios"
    const handleShowUserList = async () => {
        console.log("Clic en + Usuarios"); // Confirmar que la función se ejecuta
    
        if (!showUserList) {
            console.log("Cargando usuarios desde la API...");
            await fetchUsers();
        }
    
        setShowUserList(!showUserList);
    };
    
    


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

    useEffect(() => {
            window.scrollTo(0, 0); 
        }, []);

    useEffect(() => {
        console.log("Estado de showUserList:", showUserList);
    }, [showUserList]);
        


    if (store.isLogged && userData) {
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
                            {userData.address}, {userData.city} ({userData.postalCode})
                        </p>
                        <div className="profile-stats-log">
                            <span className="followers-log">{userData.followed_by.length} Seguidores</span>
                            <span className="following-log">{userData.following_users.length} Seguidos</span>
                            <button 
                                className="btn btn-primary user-list-btn" 
                                onClick={handleShowUserList} // Llamamos a la función correctamente
                            >
                                + Usuarios
                            </button> 
                        </div>
                    </div>
                </div>

                {/* Modal de lista de usuarios */}
                {showUserList && (
                    <div className="user-list-modal">
                        <h3 className="modal-title">Lista de Usuarios</h3>
                        <button className="close-modal" onClick={handleShowUserList}>X</button>
                        <div className="user-list">
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <div key={user.id} className="user-item">
                                        <img src={user.img || "default-avatar.png"} alt={user.userName} className="user-avatar"/>
                                        <div className="user-info">
                                            <h5>{user.userName}</h5>
                                            <p>{user.itemsForSale || 0} artículos en venta</p>
                                            <button className="btn btn-follow" onClick={() => actions.followUser(user.id)}>
                                                Seguir +
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No hay usuarios disponibles.</p>
                            )}
                        </div>
                    </div>
                )}


                <div className="profile-description-log">
                    <p>{userData.description || "Descripción no proporcionada."}</p>
                    {!userData.subscription && (
                        <button className="btn-premium-log">Go Premium</button>
                    )}
                </div>
                <div className="profile-section-log">
                    <h2>Favoritos</h2>
                    <div className="horizontal-scrollable">
                        <div className="row flex-nowrap pt-1">
                            {store.favorites?.length > 0 ? (
                                store.favorites.map((product) => (
                                    <div key={product.id} className="favorite-item-log">
                                        <img src={product.img} alt={product.name} className="favorite-img-log" />
                                        <p>{product.name}</p>
                                        <span>{product.price} €</span>
                                    </div>
                                ))
                            ) : (
                                <p>No tienes productos favoritos.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="profile-section-log">
                    <h2>Escaparate</h2>
                    <div className="showcase-container-log">
                        {userData.products?.length > 0 ? (
                            userData.products.map((product) => (
                                <div key={product.id} className="showcase-item-log">
                                    <img src={product.img} alt={product.name} className="showcase-img-log" />
                                    <p>{product.name}</p>
                                    <span>{product.price} €</span>
                                </div>
                            ))
                        ) : (
                            <p>No tienes productos en tu escaparate.</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }
        
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

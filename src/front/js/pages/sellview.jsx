import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/sellview.css";
import { useNavigate } from "react-router-dom";
import { PhotoUpload } from "../component/photoupload.jsx";

//import { LoginModal } from "../component/login-modal.jsx";

export const SellView = () => {
    const { store, actions } = useContext(Context);
    const [typeOptions, setTypeOptions] = useState([]);
    const [uploadedPhoto, setUploadedPhoto] = useState("");
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

    const handleSell = () => {
        // Aquí puedes manejar el envío del formulario junto con la URL de la foto cargada
        console.log("Foto cargada:", uploadedPhoto);
        // Resto de lógica para enviar el formulario
    };

    // useEffect(() => {pull ori
    //                     window.scrollTo(0, 0); 
    //                     actions.setShowLoginModal(false); 
    //                 }, []);


    return (
        <div className="sell-container">
            {/*{store.showLoginModal && <LoginModal />*/}
            <section className="text-center mb-4">
                <h1 className="title">¡Empieza a vender!</h1>
                <p className="subtitle">Fácil y rápido, con total seguridad. Garantía Final Boss.</p>
            </section>

            <section className="row align-items-center mb-4">
                <div className="col-md-4 d-flex justify-content-center">
                    <PhotoUpload onUploadSuccess={setUploadedPhoto} />
                </div>
                <div className="col-md-8 d-flex flex-column justify-content-center">
                    <p className="mb-3">
                        Sube tu foto, añade los datos y empieza a vender. Recuerda que puedes promocionar hasta dos
                        artículos sin coste extra con tu suscripción.
                    </p>
                    <div className="d-flex gap-2">
                        <button className="btn btn-success px-4 __premium_button__" onClick={handleGoToPremium}>Go to Premium</button>
                    </div>
                </div>
            </section>

            <section className="bg-dark text-light p-4 rounded">
                <form className="d-flex flex-column gap-4">
                    <div className="row">
                        <div className="col-md-6 d-flex flex-column __form_properties__">
                            <label htmlFor="name" className="mb-2">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Nombre"
                            />
                        </div>
                        <div className="col-md-6">
                            <div className="row g-2">
                                <div className="col-6 d-flex flex-column __form_properties__">
                                    <label htmlFor="category" className="mb-2">Categoría</label>
                                    <select
                                        className="form-select"
                                        id="category"
                                        onChange={(e) => updateTypeOptions(e.target.value)}>
                                        <option value="">Selecciona</option>
                                        <option value="consola">Consola</option>
                                        <option value="juego">Juego</option>
                                        <option value="accesorio">Accesorio</option>
                                    </select>
                                </div>
                                <div className="col-6 d-flex flex-column __form_properties__">
                                    <label htmlFor="state" className="mb-2">Estado</label>
                                    <select
                                        className="form-select"
                                        id="state">
                                        <option value="">Selecciona</option>
                                        <option value="nuevo">Nuevo</option>
                                        <option value="usado">Usado</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 d-flex flex-column __form_properties__">
                            <label htmlFor="brand" className="mb-2">Marca</label>
                            <input
                                type="text"
                                className="form-control"
                                id="brand"
                                placeholder="Marca"
                            />
                        </div>
                        <div className="col-md-6 d-flex flex-column __form_properties__">
                            <label htmlFor="year" className="mb-2">Año</label>
                            <input
                                type="text"
                                className="form-control"
                                id="year"
                                placeholder="Año"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 d-flex flex-column __form_properties__">
                            <label htmlFor="platform" className="mb-2">Plataforma</label>
                            <input
                                type="text"
                                className="form-control"
                                id="platform"
                                placeholder="Plataforma"
                            />
                        </div>
                        <div className="col-md-6 d-flex flex-column __form_properties__">
                            <label htmlFor="type" className="mb-2">Tipo</label>
                            <select id="type" className="form-select">
                                <option value="">Selecciona</option>
                                {typeOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="d-flex flex-column __form_properties__">
                        <label htmlFor="description" className="mb-2">Descripción</label>
                        <textarea
                            id="description"
                            className="form-control"
                            placeholder="Escribe una descripción..."
                            rows="3"
                        ></textarea>
                    </div>
                    <div className="d-flex flex-column w-50">
                        <label htmlFor="price" className="mb-2">Precio</label>
                        <input
                            type="number"
                            className="price-input"
                            id="price"
                            placeholder="€uros"
                        />
                    </div>
                    <div className="d-flex justify-content-center __sell_button__">
                        <button
                            type="button"
                            className="btn bt_sell px-5"
                            onClick={handleSell}>
                            Vender
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};
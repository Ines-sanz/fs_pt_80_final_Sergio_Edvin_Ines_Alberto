import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const Contacto = () => {
    const { store, actions } = useContext(Context);

    return (
       <>
       <h1>Contacto</h1>
       </>
    );
};

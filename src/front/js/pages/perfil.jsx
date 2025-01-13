import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const Perfil = () => {
    const { store, actions } = useContext(Context);

    return (
       <>
       <h1>Perfil</h1>
       </>
    );
};

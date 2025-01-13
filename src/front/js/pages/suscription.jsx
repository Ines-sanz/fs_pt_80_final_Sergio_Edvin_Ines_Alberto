import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const Suscription = () => {
    const { store, actions } = useContext(Context);

    return (
       <>
       <h1>Suscription</h1>
       </>
    );
};

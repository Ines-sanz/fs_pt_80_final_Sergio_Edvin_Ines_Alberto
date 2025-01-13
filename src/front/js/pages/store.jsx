import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const Store = () => {
    const { store, actions } = useContext(Context);

    return (
       <>
       <h1>Store</h1>
       </>
    );
};

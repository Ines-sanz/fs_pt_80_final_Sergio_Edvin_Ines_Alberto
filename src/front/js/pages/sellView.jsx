import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const SellView = () => {
    const { store, actions } = useContext(Context);

    return (
       <>
       <h1>Sell View</h1>
       </>
    );
};

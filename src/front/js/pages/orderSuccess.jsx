import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const OrderSuccess = () => {
    const {store, actions} = useContext(Context);
    const navigate = useNavigate()


    // setTimeout(()=>{
    //     navigate('/')
    // },3000)


    return(
        <div>
                <h2>
                    Order Successful!
                </h2>
                <div>
            <p>Date: {store.orderSuccess?.date} </p>
            <p>Subtotal: {store.orderSuccess?.subtotal_amount} </p>
            <p>Total: {store.orderSuccess?.total_amount} </p>
            <p>Discount: {store.orderSuccess?.discount} </p>
            <p>Address: {store.orderSuccess?.address} </p>
            <p>City: {store.orderSuccess?.city} </p>
            <p>Postal Code: {store.orderSuccess?.postal_code} </p>
                </div>
                <div>
                    <Link to="/">
                    <button>
                        Home
                    </button>
                    </Link>
                </div>
        </div>

    );
};


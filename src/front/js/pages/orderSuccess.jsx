import React, {useState} from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/ordersuccess.css";


export const OrderSuccess = () => {
    const location = useLocation();
    const { amount, paymentIntentId } = location.state || {};
    const [order, setOrder] = useState(null);
    
    if (!order) {
        return <p>Loading...</p>;
    }

    return(
        <div>

                <h2>
                    Order Successful!
                </h2>
                <div>
            <p>Date: {order.date} </p>
            <p>Subtotal: {order.subtotal_amount} </p>
            <p>Total: {order.total_amount} </p>
            <p>Discount: {order.discount} </p>
            <p>Address: {order.address} </p>
            <p>City: {order.city} </p>
            <p>Postal Code: {order.postal_code} </p>
            <p>Country {order.country} </p>
            <p>Buyer ID: {order.buyer_id} </p>
            <p>Seller ID: {order.seller_id} </p>
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


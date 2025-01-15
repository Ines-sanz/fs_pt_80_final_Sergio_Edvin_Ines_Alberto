import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

import {ProductCard} from "../component/product-small-card.jsx";
import {VideogameCard} from "../component/videogame-small-card.jsx";


export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container">
      <div className="home-banners row my-5">
        <figure className="col-6">
          {" "}
          <Link to="/suscripcion">
            <img
              src="https://res.cloudinary.com/dr0wlij0c/image/upload/v1736453860/web-illustrations/premium-boss.png"
              alt=""
              className="img-fluid"
            />
          </Link>
        </figure>
        <figure className="col-6">
          <Link to="/sell">
            <img
              src="https://res.cloudinary.com/dr0wlij0c/image/upload/v1736453861/web-illustrations/sell-items.png"
              alt=""
              className="img-fluid"
            />
          </Link>
        </figure>
      </div>
      <div className="my-5">
        <h3 className="t-seccion">Consolas</h3>
        <div className="row flex-nowrap pt-1">
		<ProductCard/>
        </div>
      </div>

	  <div className="my-5">
        <h3 className="t-seccion">Consolas</h3>
        <div className="row flex-nowrap pt-1">
		<VideogameCard/>
        </div>
		<div className="row my-5 home-type g-2">
			<img src="https://res.cloudinary.com/dr0wlij0c/image/upload/v1736453861/web-illustrations/rpg.png" alt="" className="col-4" />
			<img src="https://res.cloudinary.com/dr0wlij0c/image/upload/v1736453860/web-illustrations/action.png" alt="" className="col-4" />
			<img src="https://res.cloudinary.com/dr0wlij0c/image/upload/v1736453860/web-illustrations/fighting.png" alt="" className="col-4" />
		</div>
      </div>

	  <div className="my-5">
        <h3 className="t-seccion">Accesorios</h3>
        <div className="row flex-nowrap pt-1">
		<ProductCard/>
        </div>
      </div>
    </div>
  );
};

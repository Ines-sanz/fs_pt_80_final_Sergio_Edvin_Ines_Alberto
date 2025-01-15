import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

import { ProductCard } from "../component/product-small-card.jsx";
import { VideogameCard } from "../component/videogame-small-card.jsx";
import { GameType } from "../component/random-type.jsx";


export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container">
      <section className="home-banners row my-5">
        <figure className=" col-12 col-lg-6">
          {" "}
          <Link to="/suscripcion">
            <img
              src="https://res.cloudinary.com/dr0wlij0c/image/upload/v1736453860/web-illustrations/premium-boss.png"
              alt=""
              className="img-fluid"
            />
          </Link>
        </figure>
        <figure className="col-12 col-lg-6">
          <Link to="/sell">
            <img
              src="https://res.cloudinary.com/dr0wlij0c/image/upload/v1736453861/web-illustrations/sell-items.png"
              alt=""
              className="img-fluid"
            />
          </Link>
        </figure>
      </section>
      <section className="my-5">
        <h3 className="t-seccion">Consolas</h3>
        <div className="horizontal-scrollable">
          <div className="row flex-nowrap pt-1">
            {store.consoles?.map((console) => (
              <ProductCard
                key={console.id}
                img={console.img}
                name={console.name}
                brand={console.brand}
                price={console.price}
                promoted={console.promoted}
                id={console.id}
              />
            ))}
          </div>
        </div>
      </section>
      <div className="divider"></div>
      <section className="my-5">
        <h3 className="t-seccion">Videojuegos</h3>
        <div className="horizontal-scrollable">
          <div className="row flex-nowrap pt-1">
            {store.videogames?.map((videogame) => (
              <VideogameCard
                key={videogame.id}
                img={videogame.img}
                name={videogame.name}
                brand={videogame.brand}
                price={videogame.price}
                promoted={videogame.promoted}
                id={videogame.id}
              />
            ))}
          </div>
        </div>
        <div className="row my-5 home-type g-2">
          <GameType />
        </div>
      </section>
      <div className="divider"></div>
      <section className="my-5">
        <h3 className="t-seccion">Accesorios</h3>
        <div className="horizontal-scrollable">
          <div className="row flex-nowrap pt-1">
            {store.accesorys?.map((accesory) => (
              <ProductCard
                key={accesory.id}
                img={accesory.img}
                name={accesory.name}
                brand={accesory.brand}
                price={accesory.price}
                promoted={accesory.promoted}
                id={accesory.id}
              />
            ))}
          </div>
        </div>
      </section>
      <div className="divider"></div>
      <section className="row faq-home">
        <div className="col-8">
          <h3>¿Tienes dudas?</h3>
          <p>Consulta nuestras <Link to="/contacto">preguntas frecuentes</Link></p>
          <Link to="/suscripcion" className="faq-home-button">Go premium</Link>
          <p>Contacto directo y mucho más...</p>
        </div>
        <figure className="col-4 text-start">
          <img src="https://res.cloudinary.com/dr0wlij0c/image/upload/c_thumb,w_200,g_face/v1736455865/web-illustrations/r5r3z9kfuqd95yennokv.png" alt="FAQ" className="img-fluid" />
        </figure>
      </section>
    </div>
  );
};

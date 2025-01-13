import React, { Component } from "react";
import "../../styles/smallcard.css";

export const VideogameCard = () => (
  <>
    <div class="col-10 col-md-4 col-lg-3">
      {/* <img className="img-fluid" src={props.img} alt={props.name} onClick={handleLink} /> */}
      <div className="videogame-sm-bg">
        <img
          className="img-fluid"
          src="https://res.cloudinary.com/dr0wlij0c/image/upload/v1735417075/Sonic_the_Hedgehog_1_Genesis_box_art_acuubo.jpg"
        />
      </div>

      <div className="px-0 mt-2">
        <span class="small-c-brand">Brand</span>
        <h5 class="small-c-name">Product Name</h5>
        <div  className="d-flex justify-content-between">
        <span class="small-c-price"> 99.99€</span>   
        <span className="fa-solid fa-star fav-icon"></span>
        </div>
        
      </div>
    </div>
  </>
);

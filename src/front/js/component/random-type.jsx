import React, { useState, useEffect } from "react";
import "../../styles/types-home.css";
import { useNavigate } from "react-router-dom";

 export const GameType = () => {
    const navigate = useNavigate();
  

    const images = [
      { src: "https://res.cloudinary.com/dr0wlij0c/image/upload/v1736453861/web-illustrations/rpg.png", title: "RPG", type: "RPG" },
      { src: "https://res.cloudinary.com/dr0wlij0c/image/upload/v1736453860/web-illustrations/action.png", title: "Action", type: "Action" },
      { src: "https://res.cloudinary.com/dr0wlij0c/image/upload/v1736453860/web-illustrations/fighting.png", title: "Sports / Fighting", type: "Sports" },
      { src: "https://res.cloudinary.com/dr0wlij0c/image/upload/v1736453860/web-illustrations/adventure.png", title: "Adventure", type: "Adventure" },
      { src: "https://res.cloudinary.com/dr0wlij0c/image/upload/v1736453861/web-illustrations/strategy.png", title: "Strategy", type: "Strategy" },
      { src: "https://res.cloudinary.com/dr0wlij0c/image/upload/v1736453861/web-illustrations/terror.png", title: "Survival / Horror", type: "Survival" },
      { src: "https://res.cloudinary.com/dr0wlij0c/image/upload/v1736453860/web-illustrations/platform.png", title: "Platforms", type: "Platforms" },
      { src: "https://res.cloudinary.com/dr0wlij0c/image/upload/v1736453861/web-illustrations/indie.png", title: "Indie", type: "Indie" },
    ];
  
    const [randomImages, setRandomImages] = useState([]);
  
    useEffect(() => {
      const shuffled = [...images].sort(() => 0.5 - Math.random()).slice(0, 3);
      setRandomImages(shuffled);
    }, []);
  
    
    const handleCategoryClick = (type) => {
      navigate(`/videogames/${type}`);
    };
  
    return (
      <div className="row my-5 home-type g-2">
        {randomImages.map((image, index) => (
          <div
            key={index}
            className="image-container  col-md-4"
            onClick={() => handleCategoryClick(image.type)}
            style={{ cursor: "pointer" }}
          >
            <img src={image.src} alt={image.title} />
            <div className="overlay">
              <span className="title">{image.title}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
 
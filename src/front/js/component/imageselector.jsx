// import React, { useState, useEffect } from "react";

// export const ImageSelector = () => {

//     const [images, setImages] = useState([]);

//     const fetchImages = async () => {
//         try {
//             const response = await fetch("/api/products");
//                 if (!response.ok) throw new Error("Error obtainig images");
//             const data = await response.json();
//             setImages(data);
//         } catch (error) {
//             console.log(error);
//         }
//     };   
//     return (
//         <div>
//             <h2>Selecciona una imagen</h2>
//         </div>
//     );
// };
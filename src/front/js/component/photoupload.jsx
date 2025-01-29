import React, { useState, useContext } from "react";
import "../../styles/photoupload.css";
import { Context } from "../store/appContext";

export const PhotoUpload = ({ onUploadSuccess }) => {
    const { actions } = useContext(Context);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState('');

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Por favor, selecciona un archivo.");
            return;
        }

        setUploading(true);

        const imageUrl = await actions.uploadImageToBackend(selectedFile); 

        if (imageUrl) {
            setUploadedUrl(imageUrl);
            alert("Foto subida con éxito.");
            onUploadSuccess(imageUrl);
        } else {
            alert("Error al subir la foto.");
        }
        setUploading(false);
    };

    return (
        <div className="photo-upload">
            <label htmlFor="photo-input" className="__image__">
                 <span class="fa-solid fa-plus"></span>
            </label>
            <input
                type="file"
                className="photo-input"
                id="photo-input"
                onChange={handleFileChange}
            />
            <button
                onClick={handleUpload}
                className="btn btn-color mt-3"
                disabled={uploading || !selectedFile}
            >
                {uploading ? "Subiendo..." : "Subir Foto"}
            </button>
        </div>
    );
};

// import React, {useState} from "react"; 

// export const Uploader = () => {

// const [file, setFile] = useState(null);
// const [uploadedUrl, setUploadedUrl] = useState('');

// const handleFileChange = (e) => {
//   setFile(e.target.files[0]);
// };

// const handleUpload = async () => {
//   const formData = new FormData();
//   formData.append('file', file);

//   const response = await fetch(process.env.BACKEND_URL+'api/upload', {
//     method: 'POST',
//     body: formData,
//   });

//   const data = await response.json();
//   if (data.secure_url) {
//     setUploadedUrl(data.secure_url);
//   }
// };

// return (
//   <div className="App">
//     <h1>Upload Image to Cloudinary</h1>
//     <input type="file" onChange={handleFileChange} />
//     <button onClick={handleUpload}>Upload</button>
//     {uploadedUrl && (
//       <div>
//         <h3>Uploaded Image:</h3>
//         <img src={uploadedUrl} alt="Uploaded" style={{ width: '300px' }} />
//       </div>
//     )}
//   </div>
// );
// }
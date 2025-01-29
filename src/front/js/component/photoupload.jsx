import React, { useState } from "react";
import "../../styles/photoupload.css";

export const PhotoUpload = ({ onUploadSuccess }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Por favor, selecciona un archivo.");
            return;
        }

        setUploading(true);

        const imageUrl = await actions.uploadImageToCloudinary(selectedFile); 

        if (imageUrl) {
            alert("Foto subida con éxito.");
            onUploadSuccess(imageUrl); 
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
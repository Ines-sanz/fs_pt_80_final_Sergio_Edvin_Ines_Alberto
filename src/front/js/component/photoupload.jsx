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

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", "your_upload_preset"); // Sustituir con tu upload preset de Cloudinary
        formData.append("cloud_name", "dr0wlij0c");

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/dr0wlij0c/image/upload`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            console.log("Detalles de la imagen cargada:", data);

            alert("Foto subida con éxito.");
            if (onUploadSuccess) {
                onUploadSuccess(data.url); // Retorna la URL de la imagen al componente padre
            }
        } catch (error) {
            console.error("Error al subir la foto:", error);
            alert("Error al subir la foto.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="photo-upload">
            <label htmlFor="photo-input" className="__image__">
                 <span className="fa-solid fa-plus"></span>
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
                disabled={uploading}
            >
                {uploading ? "Subiendo..." : "Subir Foto"}
            </button>
        </div>
    );
};
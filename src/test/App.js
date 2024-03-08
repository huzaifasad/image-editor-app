import React, { useState } from 'react';
import './App.css'; // Import CSS file for styling

function App() {
    const [image, setImage] = useState(null);
    const [originalImage, setOriginalImage] = useState(null); // Store the original image
    const [sketchUrl, setSketchUrl] = useState(null);
    const [opacity, setOpacity] = useState(100);
    const [brightness, setBrightness] = useState(0);
    const [contrast, setContrast] = useState(0);
    const [sharpness, setSharpness] = useState(0);
    const [thickness, setThickness] = useState(1); // Add thickness state

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
        setOriginalImage(URL.createObjectURL(selectedImage)); // Set the original image URL
        setSketchUrl(null); // Reset sketch URL when a new image is uploaded
    };

    const handleOpacityChange = async (event) => {
        setOpacity(event.target.value);
        await processProperty('opacity', event.target.value);
    };

    const handleBrightnessChange = async (event) => {
        setBrightness(event.target.value);
        await processProperty('brightness', event.target.value);
    };

    const handleContrastChange = async (event) => {
        setContrast(event.target.value);
        await processProperty('contrast', event.target.value);
    };

    const handleSharpnessChange = async (event) => {
        setSharpness(event.target.value);
        await processProperty('sharpness', event.target.value);
    };

    const handleThicknessChange = async (event) => {
        setThickness(event.target.value);
        await processProperty('thickness', event.target.value); // Call processProperty with thickness
    };

    const processProperty = async (property, value) => {
        const formData = new FormData();
        formData.append('image', image);
        formData.append(property, value);

        try {
            const response = await fetch(`http://localhost:5000/api/process-${property}`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Failed to process ${property}`);
            }

            const data = await response.json();
            setSketchUrl(data.sketchUrl);
        } catch (error) {
            console.error(`Error processing ${property}:`, error);
        }
    };

    const downloadImage = () => {
        const link = document.createElement('a');
        link.href = sketchUrl;
        link.download = 'processed_image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const convertToSketch = async () => {
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await fetch('http://localhost:5000/api/process-image', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to process image');
            }

            const data = await response.json();
            setSketchUrl(data.sketchUrl);
        } catch (error) {
            console.error('Error processing image:', error);
        }
    };

    return (
        <div className="container">
            <div className="upload-section">
                <input type="file" onChange={handleImageChange} />
                {originalImage && <img src={originalImage} alt="Original Image" className="original-image" />}
                {!originalImage && <span className="choose-file-text">Choose File</span>}
            </div>
            <div className="properties">
                <div className="property-slider">
                    <label>Opacity</label>
                    <input type="range" min="0" max="100" value={opacity} onChange={handleOpacityChange} />
                </div>
                <div className="property-slider">
                    <label>Brightness</label>
                    <input type="range" min="-100" max="100" value={brightness} onChange={handleBrightnessChange} />
                </div>
                <div className="property-slider">
                    <label>Contrast</label>
                    <input type="range" min="-100" max="100" value={contrast} onChange={handleContrastChange} />
                </div>
                <div className="property-slider">
                    <label>Sharpness</label>
                    <input type="range" min="-100" max="100" value={sharpness} onChange={handleSharpnessChange} />
                </div>
                <div className="property-slider">
                    <label>Thickness</label>
                    <input type="range" min="1" max="10" value={thickness} onChange={handleThicknessChange} />
                </div>
            </div>
            <button className="process-button" onClick={convertToSketch}>Convert to Sketch</button>
            {sketchUrl && <img src={sketchUrl} alt="Processed Image" className="processed-image" />}
            {sketchUrl && <button className="download-button" onClick={downloadImage}>Download Image</button>}
        </div>
    );
}

export default App;
import React, { useState } from 'react';

function Sketch() {
    const [image, setImage] = useState(null);
    const [originalImage, setOriginalImage] = useState(null);
    const [sketchUrl, setSketchUrl] = useState(null);
    const [opacity, setOpacity] = useState(100);
    const [brightness, setBrightness] = useState(0);
    const [contrast, setContrast] = useState(0);
    const [sharpness, setSharpness] = useState(0);

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
        setOriginalImage(URL.createObjectURL(selectedImage));
        setSketchUrl(null);
        applyChanges(selectedImage);
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

    const applyChanges = async (selectedImage) => {
        const formData = new FormData();
        formData.append('image', selectedImage);

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
        <div className="container mx-auto px-4 py-8">
            <div className="upload-section">
                <input type="file" onChange={handleImageChange} />
                {originalImage && <img src={originalImage} alt="Original Image" className="original-image mx-auto my-4" />}
                {!originalImage && <span className="choose-file-text block text-center py-4">Choose File</span>}
            </div>
            <div className="properties grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            </div>
            <button className="download-button mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Download Sketch Image</button>
            {sketchUrl && <img src={sketchUrl} alt="Processed Image" className="processed-image mx-auto my-8" />}
        </div>
    );
}

export default Sketch;
